package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeliveryRepo extends JpaRepository<Delivery, Long> {
    Optional<Delivery> findByOrder_Id(Long orderId);
}
