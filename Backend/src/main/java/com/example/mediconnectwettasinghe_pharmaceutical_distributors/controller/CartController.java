package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Controller;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.AddToCartDto;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.CartItemDto;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.CartResponse;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.AppUser;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo.UserRepo;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.security.Principal;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class CartController {

    private final CartService cartService;
    private final UserRepo userRepo;

    private Integer currentUserId(Principal principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        }
        AppUser user = userRepo.findByEmail(principal.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        return user.getId();
    }

    /** Add/merge a product into the current user's active cart. */
    @PostMapping("/save")
    public CartItemDto add(Principal principal, @RequestBody AddToCartDto dto) {
        // enforce the authenticated user; ignore any userId the client might send
        dto.setUserId(currentUserId(principal));
        return cartService.add(dto);
    }

    /** Get current user's cart (no userId param). */
    @GetMapping("/list")
    public CartResponse list(Principal principal) {
        return cartService.list(currentUserId(principal));
    }

    /** Update a cart line (optionally quantity and/or unitPrice). */
    @PutMapping("/{cartItemId}")
    public CartItemDto update(@PathVariable Long cartItemId,
                              @RequestParam(required = false) Integer quantity,
                              @RequestParam(required = false) BigDecimal unitPrice,
                              Principal principal) {
        return cartService.updateOwned(cartItemId, currentUserId(principal), quantity, unitPrice);
    }

    /** Remove a cart line. */
    @DeleteMapping("/{cartItemId}")
    public void remove(@PathVariable Long cartItemId, Principal principal) {
        cartService.removeOwned(cartItemId, currentUserId(principal));
    }

    /** Clear current user's cart. */
    @PostMapping("/clear")
    public void clear(Principal principal) {
        cartService.clear(currentUserId(principal));
    }
}



//package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Controller;
//
//import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.AddToCartDto;
//import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.CartItemDto;
//import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.CartResponse;
//import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service.CartService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.math.BigDecimal;
//
//@RestController
//@RequestMapping("/api/cart")
//@RequiredArgsConstructor
//@CrossOrigin(origins = "*")
//public class CartController {
//
//    private final CartService svc;
//
//    // POST /api/cart/save  <-- you had this commented out
//    @PostMapping("/save")
//    public CartItemDto add(@RequestBody AddToCartDto dto) {
//        return svc.add(dto);
//    }
//
//
//    // GET /api/cart/list?userId=1
//    @GetMapping("/list")
//    public CartResponse list(@RequestParam Integer userId) {
//        return svc.list(userId);
//    }
//
//    // PUT /api/cart/{cartItemId}?quantity=3  (unitPrice is optional)
//    @PutMapping("/{cartItemId}")
//    public CartItemDto update(@PathVariable Long cartItemId,
//                              @RequestParam(required = false) Integer quantity,
//                              @RequestParam(required = false) BigDecimal unitPrice) {
//        return svc.update(cartItemId, quantity, unitPrice);
//    }
//
//    // DELETE /api/cart/{cartItemId}
//    @DeleteMapping("/{cartItemId}")
//    public void remove(@PathVariable Long cartItemId) {
//        svc.remove(cartItemId);
//    }
//
//    // POST /api/cart/clear?userId=1
//    @PostMapping("/clear")
//    public void clear(@RequestParam Integer userId) {
//        svc.clear(userId);
//    }
//}
//
//
//
////package com.MEDICONNECT.OrderM.controller;
////
////import com.MEDICONNECT.OrderM.dto.*;
////import com.MEDICONNECT.OrderM.service.CartService;
////import lombok.RequiredArgsConstructor;
////import org.springframework.web.bind.annotation.*;
////
////import java.math.BigDecimal;
////
////@RestController
////@RequestMapping("/api/cart")
////@RequiredArgsConstructor
////@CrossOrigin(origins = "*")
////public class CartController {
////
////    private final CartService svc;
////
////    @PostMapping("/clear")
////    public void clear(@RequestParam Integer userId) {
////        var cart = svc.list(userId); // ensures active cart exists
////        // svc.list returns DTO; better add a service method to actually clear:
////        svc.clear(userId);
////    }
////
//////    @PostMapping("/save")
//////    public CartItemDto add(@RequestBody AddToCartDto dto) {
//////        return svc.add(dto);
//////    }
////
////    @GetMapping("/list")
////    public CartResponse list(@RequestParam Integer userId) {
////        return svc.list(userId);
////    }
////
////    @PutMapping("/{cartItemId}")
////    public CartItemDto update(@PathVariable Long cartItemId,
////                              @RequestParam(required = false) Integer quantity,
////                              @RequestParam(required = false) BigDecimal unitPrice) {
////        return svc.update(cartItemId, quantity, unitPrice);
////    }
////
////    @DeleteMapping("/{cartItemId}")
////    public void remove(@PathVariable Long cartItemId) {
////        svc.remove(cartItemId);
////    }
////}
