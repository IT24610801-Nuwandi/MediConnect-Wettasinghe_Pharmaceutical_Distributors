package com.example.mediconnectwettasinghe_pharmaceutical_distributors.controller;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.dto.AddToCartDto;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.dto.CartItemDto;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.dto.CartResponse;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService svc;

    // POST /api/cart/save  <-- you had this commented out
    @PostMapping("/save")
    public CartItemDto add(@RequestBody AddToCartDto dto) {
        return svc.add(dto);
    }

    // GET /api/cart/list?userId=1
    @GetMapping("/list")
    public CartResponse list(@RequestParam Integer userId) {
        return svc.list(userId);
    }

    // PUT /api/cart/{cartItemId}?quantity=3  (unitPrice is optional)
    @PutMapping("/{cartItemId}")
    public CartItemDto update(@PathVariable Long cartItemId,
                              @RequestParam(required = false) Integer quantity,
                              @RequestParam(required = false) BigDecimal unitPrice) {
        return svc.update(cartItemId, quantity, unitPrice);
    }

    // DELETE /api/cart/{cartItemId}
    @DeleteMapping("/{cartItemId}")
    public void remove(@PathVariable Long cartItemId) {
        svc.remove(cartItemId);
    }

    // POST /api/cart/clear?userId=1
    @PostMapping("/clear")
    public void clear(@RequestParam Integer userId) {
        svc.clear(userId);
    }
}



//package com.MEDICONNECT.OrderM.controller;
//
//import com.MEDICONNECT.OrderM.dto.*;
//import com.MEDICONNECT.OrderM.service.CartService;
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
//    @PostMapping("/clear")
//    public void clear(@RequestParam Integer userId) {
//        var cart = svc.list(userId); // ensures active cart exists
//        // svc.list returns DTO; better add a service method to actually clear:
//        svc.clear(userId);
//    }
//
////    @PostMapping("/save")
////    public CartItemDto add(@RequestBody AddToCartDto dto) {
////        return svc.add(dto);
////    }
//
//    @GetMapping("/list")
//    public CartResponse list(@RequestParam Integer userId) {
//        return svc.list(userId);
//    }
//
//    @PutMapping("/{cartItemId}")
//    public CartItemDto update(@PathVariable Long cartItemId,
//                              @RequestParam(required = false) Integer quantity,
//                              @RequestParam(required = false) BigDecimal unitPrice) {
//        return svc.update(cartItemId, quantity, unitPrice);
//    }
//
//    @DeleteMapping("/{cartItemId}")
//    public void remove(@PathVariable Long cartItemId) {
//        svc.remove(cartItemId);
//    }
//}
