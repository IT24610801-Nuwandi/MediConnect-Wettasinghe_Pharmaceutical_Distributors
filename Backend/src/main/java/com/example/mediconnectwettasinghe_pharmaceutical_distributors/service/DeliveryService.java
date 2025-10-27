package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.Delivery;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.OrderHdr;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo.DeliveryRepo;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo.OrderRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class DeliveryService {

    private final DeliveryRepo deliveryRepo;
    private final OrderRepo orderRepo;

    /** Ensure a delivery row exists for the order. */
    @Transactional
    public Delivery ensureForOrder(Long orderId) {
        return deliveryRepo.findByOrder_Id(orderId)
                .orElseGet(() -> {
                    OrderHdr order = orderRepo.findById(orderId)
                            .orElseThrow(() -> new IllegalArgumentException("Order not found"));
                    Delivery d = new Delivery();
                    d.setOrder(order);
                    d.setStatus("QUEUED");
                    return deliveryRepo.save(d);
                });
    }

    @Transactional(readOnly = true)
    public Delivery getByOrder(Long orderId) {
        return deliveryRepo.findByOrder_Id(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Delivery not found for order " + orderId));
    }

    /** Assign courier and generate a tracking number. */
    @Transactional
    public Delivery assignCourier(Long orderId, String provider) {
        Delivery d = ensureForOrder(orderId);
        d.setProvider(provider);
        if (d.getTrackingNo() == null || d.getTrackingNo().isBlank()) {
            d.setTrackingNo(genTracking(orderId));
        }
        d.setStatus("ASSIGNED");
        d.setAssignedDate(LocalDateTime.now());
        return deliveryRepo.save(d);
    }

    /** Mark "out for delivery". */
    @Transactional
    public Delivery markOutForDelivery(Long orderId) {
        Delivery d = ensureForOrder(orderId);
        d.setStatus("IN_TRANSIT");
        return deliveryRepo.save(d);
    }

    /** Mark delivered. */
    @Transactional
    public Delivery markDelivered(Long orderId) {
        Delivery d = ensureForOrder(orderId);
        d.setStatus("DELIVERED");
        d.setDeliveredDate(LocalDateTime.now());
        return deliveryRepo.save(d);
    }

    /** Helper: MC-<orderId>-<6 random> */
    private String genTracking(Long orderId) {
        String alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        Random r = new Random();
        StringBuilder sb = new StringBuilder("MC-").append(orderId).append("-");
        for (int i = 0; i < 6; i++) sb.append(alphabet.charAt(r.nextInt(alphabet.length())));
        return sb.toString();
    }
}
