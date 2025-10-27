package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Controller;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.OrderDto;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.AppUser;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo.UserRepo;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class OrderController {

    private final OrderService orderService;
    private final UserRepo userRepo;

    /** Resolve current authenticated user's ID (email from JWT -> AppUser). */
    private Integer currentUserId(Principal principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        }
        AppUser u = userRepo.findByEmail(principal.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        return u.getId();
    }

    /** Convert the current user's active cart into an order. */
    @PostMapping
    public OrderDto checkout(Principal principal) {
        return orderService.checkout(currentUserId(principal));
    }

    /** List orders that belong to the current user. */
    @GetMapping
    public List<OrderDto> list(Principal principal) {
        return orderService.listByUser(currentUserId(principal));
    }

    /** (Optional) Fetch a single order. If you want to restrict to owner, enforce it here. */
    @GetMapping("/{id}")
    public OrderDto getOne(@PathVariable Long id) {
        return orderService.getOne(id);
    }

    /** (Optional/Admin) Update an order's status. Keep or secure via SecurityConfig as needed. */
    @PutMapping("/{id}/status")
    public OrderDto updateStatus(@PathVariable Long id, @RequestParam String status) {
        return orderService.updateStatus(id, status);
    }
}



//
//package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Controller;
//
//import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.OrderDto;
//import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service.OrderService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/orders")
//@RequiredArgsConstructor
//@CrossOrigin(origins = "*")
//public class OrderController {
//
//    private final OrderService svc;
//
//    @PostMapping
//    public OrderDto checkout(@RequestParam Integer userId) {
//        return svc.checkout(userId);
//    }
//
//    @GetMapping
//    public List<OrderDto> list(@RequestParam Integer userId) {
//        return svc.listByUser(userId);
//    }
//
//    @GetMapping("/{id}")
//    public OrderDto getOne(@PathVariable Long id) {
//        return svc.getOne(id);
//    }
//
//    @PutMapping("/{id}/status")
//    public OrderDto updateStatus(@PathVariable Long id, @RequestParam String status) {
//        return svc.updateStatus(id, status);
//    }
//}