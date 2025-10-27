package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Controller;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.Delivery;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/delivery")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DeliveryController {
    private final DeliveryService svc;

    @GetMapping("/{orderId}")
    public Delivery get(@PathVariable Long orderId) {
        return svc.getByOrder(orderId);
    }
}


