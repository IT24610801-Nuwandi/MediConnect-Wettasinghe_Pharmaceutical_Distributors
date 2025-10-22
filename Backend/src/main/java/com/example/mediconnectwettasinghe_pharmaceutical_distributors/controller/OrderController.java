
package com.example.mediconnectwettasinghe_pharmaceutical_distributors.controller;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.dto.OrderDto;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService svc;

    @PostMapping
    public OrderDto checkout(@RequestParam Integer userId, @RequestParam(required = false) String promoCode) {
        return svc.checkout(userId, promoCode);
    }

    @GetMapping
    public List<OrderDto> list(@RequestParam Integer userId) {
        return svc.listByUser(userId);
    }

    @GetMapping("/{id}")
    public OrderDto getOne(@PathVariable Long id) {
        return svc.getOne(id);
    }

    @PutMapping("/{id}/status")
    public OrderDto updateStatus(@PathVariable Long id, @RequestParam String status) {
        return svc.updateStatus(id, status);
    }
}