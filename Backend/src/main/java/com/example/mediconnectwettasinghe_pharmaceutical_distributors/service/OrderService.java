package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.OrderDto;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.OrderItemDto;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.Cart;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.CartItem;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.OrderHdr;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.OrderItem;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo.CartItemRepo;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo.CartRepo;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo.OrderRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final CartRepo cartRepo;
    private final CartItemRepo cartItemRepo;
    private final OrderRepo orderRepo;

    /** Admin list all orders. */
    @Transactional(readOnly = true)
    public List<OrderDto> listAll() {
        return orderRepo.findAll().stream().map(this::toDto).toList();
    }

    /** Convert the user’s active cart to an order. */
    @Transactional
    public OrderDto checkout(Integer userId) {
        Cart cart = cartRepo.findFirstByUserIdAndIsActiveTrue(userId)
                .orElseThrow(() -> new  ResponseStatusException(HttpStatus.CONFLICT, "No active cart for user"));

        List<CartItem> items = cartItemRepo.findAllByCart_IdOrderByAddedAtDesc(cart.getId());
        if (items.isEmpty()) throw new ResponseStatusException(HttpStatus.CONFLICT, "Cart is empty");

        OrderHdr hdr = OrderHdr.builder()
                .userId(userId)
                .status("PENDING")
                .totalAmount(BigDecimal.ZERO)
                .build();

        BigDecimal total = BigDecimal.ZERO;
        List<OrderItem> lines = new ArrayList<>();
        for (CartItem ci : items) {
            BigDecimal line = ci.getUnitPrice().multiply(BigDecimal.valueOf(ci.getQuantity()));
            total = total.add(line);

            lines.add(OrderItem.builder()
                    .order(hdr)
                    .itemId(ci.getItemId())
                    .quantity(ci.getQuantity())
                    .unitPrice(ci.getUnitPrice())
                    .build());
        }
        hdr.setItems(lines);
        hdr.setTotalAmount(total);

        OrderHdr saved = orderRepo.save(hdr);

        // Clear/close cart
        cartItemRepo.deleteAllByCart_Id(cart.getId());
        cart.setIsActive(false);
        cartRepo.save(cart);

        return toDto(saved);
    }

    @Transactional(readOnly = true)
    public List<OrderDto> listByUser(Integer userId) {
        return orderRepo.findByUserIdOrderByOrderDateDesc(userId)
                .stream().map(this::toDto).toList();
    }

    @Transactional(readOnly = true)
    public OrderDto getOne(Long orderId) {
        OrderHdr o = orderRepo.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        return toDto(o);
    }

    @Transactional
    public OrderDto updateStatus(Long orderId, String status) {
        OrderHdr o = orderRepo.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        o.setStatus(status);
        return toDto(orderRepo.save(o));
    }

    /* helpers */
    private static BigDecimal line(OrderItem i) {
        return i.getUnitPrice().multiply(BigDecimal.valueOf(i.getQuantity()));
    }

    private OrderDto toDto(OrderHdr o) {
        List<OrderItemDto> items = o.getItems().stream()
                .map(i -> new OrderItemDto(
                        i.getItemId(),
                        i.getUnitPrice(),
                        i.getQuantity(),
                        line(i)
                ))
                .toList();

        return new OrderDto(
                o.getId(),
                o.getOrderDate(),   // DB default
                o.getStatus(),
                o.getTotalAmount(),
                items
        );
    }
}



//package com.MEDICONNECT.OrderM.service;
//
//import com.MEDICONNECT.OrderM.dto.OrderDto;
//import com.MEDICONNECT.OrderM.dto.OrderItemDto;
//import com.MEDICONNECT.OrderM.entity.Cart;
//import com.MEDICONNECT.OrderM.entity.CartItem;
//import com.MEDICONNECT.OrderM.entity.OrderHdr;
//import com.MEDICONNECT.OrderM.entity.OrderItem;
//import com.MEDICONNECT.OrderM.repo.CartItemRepo;
//import com.MEDICONNECT.OrderM.repo.CartRepo;
//import com.MEDICONNECT.OrderM.repo.OrderRepo;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.math.BigDecimal;
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class OrderService {
//
//    private final CartRepo cartRepo;
//    private final CartItemRepo cartItemRepo;
//    private final DeliveryService deliveryService;
//    private final OrderRepo orderRepo;
//
//    /** Convert the user’s active cart to an order. */
//    @Transactional
//    public OrderDto checkout(Integer userId, String promoCode) {
//        Cart cart = cartRepo.findFirstByUserIdAndIsActiveTrue(userId)
//                .orElseThrow(() -> new IllegalStateException("No active cart for user"));
//
//        List<CartItem> items = cartItemRepo.findAllByCart_IdOrderByAddedAtDesc(cart.getId());
//        if (items.isEmpty()) throw new IllegalStateException("Cart is empty");
//
//        OrderHdr hdr = OrderHdr.builder()
//                .userId(userId)
//                .status("PENDING")
//                .totalAmount(BigDecimal.ZERO)
//                .promoCode(promoCode)
//                .build();
//
//        BigDecimal total = BigDecimal.ZERO;
//        List<OrderItem> lines = new ArrayList<>();
//        for (CartItem ci : items) {
//            BigDecimal line = ci.getUnitPrice().multiply(BigDecimal.valueOf(ci.getQuantity()));
//            total = total.add(line);
//
//            lines.add(OrderItem.builder()
//                    .order(hdr)
//                    .itemId(ci.getItemId())
//                    .quantity(ci.getQuantity())
//                    .unitPrice(ci.getUnitPrice())
//                    .build());
//        }
//        hdr.setItems(lines);
//        hdr.setTotalAmount(total);
//
//        OrderHdr saved = orderRepo.save(hdr);
//
//        // Clear/close cart
//        cartItemRepo.deleteAllByCart_Id(cart.getId());
//        cart.setIsActive(false);
//        cartRepo.save(cart);
//
//        deliveryService.createForOrder(saved);
//
//        return toDto(saved);
//    }
//
//    @Transactional(readOnly = true)
//    public List<OrderDto> listByUser(Integer userId) {
//        return orderRepo.findByUserIdOrderByOrderDateDesc(userId)
//                .stream().map(this::toDto).toList();
//    }
//
//    @Transactional(readOnly = true)
//    public OrderDto getOne(Long orderId) {
//        OrderHdr o = orderRepo.findById(orderId)
//                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
//        return toDto(o);
//    }
//
//    @Transactional
//    public OrderDto updateStatus(Long orderId, String status) {
//        OrderHdr o = orderRepo.findById(orderId)
//                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
//        o.setStatus(status);
//        return toDto(orderRepo.save(o));
//    }
//
//    /* helpers */
//    private static BigDecimal line(OrderItem i) {
//        return i.getUnitPrice().multiply(BigDecimal.valueOf(i.getQuantity()));
//    }
//
//    private OrderDto toDto(OrderHdr o) {
//        List<OrderItemDto> items = o.getItems().stream()
//                .map(i -> new OrderItemDto(
//                        i.getItemId(),
//                        i.getUnitPrice(),
//                        i.getQuantity(),
//                        line(i)
//                ))
//                .toList();
//
//        return new OrderDto(
//                o.getId(),
//                o.getOrderDate(),   // filled by DB default
//                o.getStatus(),
//                o.getTotalAmount(),
//                items
//        );
//    }
//}
//
