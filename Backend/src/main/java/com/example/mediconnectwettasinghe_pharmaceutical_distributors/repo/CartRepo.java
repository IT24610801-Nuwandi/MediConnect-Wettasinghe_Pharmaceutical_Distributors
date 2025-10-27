
package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {
    Optional<Cart> findFirstByUserIdAndIsActiveTrue(Integer userId);
}