package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Controller;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.OrderDto;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service.DeliveryService;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminOrderController {

    private final OrderService orderService;
    private final DeliveryService deliveryService;

    /** List all orders (admin). */
    @GetMapping
    public List<OrderDto> listAll() {
        return orderService.listAll();
    }

    /** Get one order by id. */
    @GetMapping("/{id}")
    public OrderDto getOne(@PathVariable Long id) {
        return orderService.getOne(id);
    }

    /** Update order status (e.g. PENDING/CONFIRMED/SHIPPED/DELIVERED/CANCELLED). */
    @PutMapping("/{id}/status")
    public OrderDto updateStatus(@PathVariable Long id, @RequestParam String status) {
        return orderService.updateStatus(id, status);
    }

    /** Create (or get) a delivery record and assign provider + tracking number. */
    @PostMapping("/{id}/delivery/assign")
    public OrderDto assignDelivery(@PathVariable Long id,
                                   @RequestParam String provider) {
        deliveryService.assignCourier(id, provider);
        // often you also want to flip order status to SHIPPED here:
        orderService.updateStatus(id, "SHIPPED");
        return orderService.getOne(id);
    }

    /** Mark delivery as out for delivery. */
    @PostMapping("/{id}/delivery/out")
    public OrderDto outForDelivery(@PathVariable Long id) {
        deliveryService.markOutForDelivery(id);
        return orderService.getOne(id);
    }

    /** Mark delivery as delivered. */
    @PostMapping("/{id}/delivery/delivered")
    public OrderDto delivered(@PathVariable Long id) {
        deliveryService.markDelivered(id);
        orderService.updateStatus(id, "DELIVERED");
        return orderService.getOne(id);
    }
}
