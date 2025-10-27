package com.example.mediconnectwettasinghe_pharmaceutical_distributors.repo;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductImageRepo extends JpaRepository<ProductImage, Integer> {

    long countByProduct_ItemId(Integer productId);

    List<ProductImage> findByProduct_ItemIdOrderBySortOrderAsc(Integer productId);

    Optional<ProductImage> findByImageIdAndProduct_ItemId(Integer imageId, Integer productId);
}





