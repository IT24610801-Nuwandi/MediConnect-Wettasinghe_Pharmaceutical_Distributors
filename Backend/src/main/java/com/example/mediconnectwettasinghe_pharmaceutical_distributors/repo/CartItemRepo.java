package com.example.mediconnectwettasinghe_pharmaceutical_distributors.repo;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepo extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCart_IdAndItemId(Long cartId, Integer itemId);
    List<CartItem> findAllByCart_IdOrderByAddedAtDesc(Long cartId);
    void deleteAllByCart_Id(Long cartId);
}

