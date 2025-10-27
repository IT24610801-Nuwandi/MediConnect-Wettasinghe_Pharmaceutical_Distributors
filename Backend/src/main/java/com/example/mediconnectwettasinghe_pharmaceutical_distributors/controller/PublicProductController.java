package com.example.mediconnectwettasinghe_pharmaceutical_distributors.controller;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.dto.ProductDTO;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.Product;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.repo.ProductRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/public/products")
public class PublicProductController {

    private final ProductRepo productRepo;

    public PublicProductController(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    // Grid page
    @GetMapping
    public Page<ProductDTO> list(Pageable pageable) {
        return productRepo.findAll(pageable).map(ProductDTO::from);
    }

    // Detail page
    @GetMapping("/{id}")
    public ProductDTO one(@PathVariable Integer id) {
        Product p = productRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        return ProductDTO.from(p);
    }
}

