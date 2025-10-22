package com.example.mediconnectwettasinghe_pharmaceutical_distributors.repo;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeliveryRepo extends JpaRepository<Delivery, Long> {
    Optional<Delivery> findByOrder_Id(Long orderId);
}
