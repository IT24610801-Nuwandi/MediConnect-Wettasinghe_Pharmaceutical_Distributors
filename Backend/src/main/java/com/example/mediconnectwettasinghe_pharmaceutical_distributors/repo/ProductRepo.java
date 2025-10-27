package com.example.mediconnectwettasinghe_pharmaceutical_distributors.repo;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product, Integer> {
    long countByQtyRetailLessThanEqual(Integer qtyRetail);
}
