
package com.example.mediconnectwettasinghe_pharmaceutical_distributors.service;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.dto.*;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.Cart;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.CartItem;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.repo.CartItemRepo;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.repo.CartRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepo cartRepo;
    private final CartItemRepo cartItemRepo;

    // Ensure user has an active cart (create if missing)
    private Cart ensureActiveCart(Integer userId) {
        return cartRepo.findFirstByUserIdAndIsActiveTrue(userId)
                .orElseGet(() -> cartRepo.save(Cart.builder()
                        .userId(userId)
                        .isActive(true)
                        .build()));
    }

    @Transactional
    public CartItemDto add(AddToCartDto dto) {
        if (dto.getUserId() == null || dto.getItemId() == null || dto.getQuantity() == null) {
            throw new IllegalArgumentException("userId, itemId and quantity are required");
        }

        Cart cart = (dto.getCartId() != null)
                ? cartRepo.findById(dto.getCartId()).orElseThrow(() -> new IllegalArgumentException("Cart not found"))
                : ensureActiveCart(dto.getUserId());

        if (!cart.getIsActive()) throw new IllegalStateException("Cart is not active");
        if (!cart.getUserId().equals(dto.getUserId())) throw new IllegalStateException("Cart belongs to another user");

        // merge on (cart_id, item_id)
        CartItem ci = cartItemRepo.findByCart_IdAndItemId(cart.getId(), dto.getItemId()).orElse(null);
        if (ci == null) {
            ci = CartItem.builder()
                    .cart(cart)
                    .itemId(dto.getItemId())
                    .quantity(dto.getQuantity())
                    .unitPrice(dto.getUnitPrice() != null ? dto.getUnitPrice() : BigDecimal.ZERO)
                    .build();
        } else {
            ci.setQuantity(ci.getQuantity() + dto.getQuantity());
            if (dto.getUnitPrice() != null) {
                ci.setUnitPrice(dto.getUnitPrice()); // refresh snapshot price
            }
        }

        ci = cartItemRepo.save(ci);
        return toDto(ci);
    }

    @Transactional
    public CartResponse list(Integer userId) {
        Cart cart = cartRepo.findFirstByUserIdAndIsActiveTrue(userId)
                .orElseGet(() -> ensureActiveCart(userId)); // create empty if none

        List<CartItem> items = cartItemRepo.findAllByCart_IdOrderByAddedAtDesc(cart.getId());
        List<CartItemDto> out = new ArrayList<>();
        BigDecimal grand = BigDecimal.ZERO;

        for (CartItem ci : items) {
            CartItemDto d = toDto(ci);
            out.add(d);
            grand = grand.add(d.getLineTotal() != null ? d.getLineTotal() : BigDecimal.ZERO);
        }
        return new CartResponse(out, grand);
    }

    @Transactional
    public CartItemDto update(Long cartItemId, Integer quantity, BigDecimal unitPrice) {
        CartItem ci = cartItemRepo.findById(cartItemId)
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found"));
        if (quantity != null) {
            if (quantity <= 0) { // interpret as remove
                cartItemRepo.delete(ci);
                return null; // or throw 204 from controller if you prefer
            }
            ci.setQuantity(quantity);
        }
        if (unitPrice != null) ci.setUnitPrice(unitPrice);
        return toDto(cartItemRepo.save(ci));
    }

    @Transactional
    public void remove(Long cartItemId) {
        cartItemRepo.deleteById(cartItemId);
    }

    /* helpers */
    private CartItemDto toDto(CartItem ci) {
        BigDecimal line = ci.getUnitPrice().multiply(BigDecimal.valueOf(ci.getQuantity()));
        return new CartItemDto(ci.getId(), ci.getItemId(), ci.getQuantity(), ci.getUnitPrice(), line);
    }

    @Transactional
    public void clear(Integer userId) {
        Cart cart = ensureActiveCart(userId);
        cartItemRepo.deleteAllByCart_Id(cart.getId());
    }
}
