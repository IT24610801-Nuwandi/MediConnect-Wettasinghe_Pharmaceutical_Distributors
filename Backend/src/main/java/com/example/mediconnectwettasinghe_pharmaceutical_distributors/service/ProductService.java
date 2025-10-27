package com.example.mediconnectwettasinghe_pharmaceutical_distributors.service;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.dto.ProductDTO;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.Product;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.ProductImage;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.repo.ProductImageRepo;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.repo.ProductRepo;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepo productRepo;
    private final ProductImageRepo imageRepo;

    public ProductService(ProductRepo productRepo, ProductImageRepo imageRepo) {
        this.productRepo = productRepo;
        this.imageRepo = imageRepo;
    }

    public List<ProductDTO> list() {
        return productRepo.findAll().stream().map(ProductDTO::from).toList();
    }

    public Product create(Product p) {
        return productRepo.save(p);
    }

    public Product get(Integer id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    }

    public Product update(Integer id, Product incoming) {
        Product db = get(id);

        db.setItemCode(incoming.getItemCode());
        db.setItemName(incoming.getItemName());
        db.setBrand(incoming.getBrand());
        db.setAgency(incoming.getAgency());
        db.setCategory(incoming.getCategory());
        db.setStrength(incoming.getStrength());
        db.setSize(incoming.getSize());
        db.setMarketName(incoming.getMarketName());
        db.setPriceRetail(incoming.getPriceRetail());
        db.setQtyRetail(incoming.getQtyRetail());
        db.setPriceWholesale(incoming.getPriceWholesale());
        db.setQtyWholesale(incoming.getQtyWholesale());
        db.setPurchaseUnit(incoming.getPurchaseUnit());
        db.setSellingUnit(incoming.getSellingUnit());
        db.setIsNew(incoming.getIsNew());
        db.setIsActive(incoming.getIsActive());
        return productRepo.save(db);
    }

    public void delete(Integer id) {
        productRepo.deleteById(id);
    }

    @Transactional
    public ProductImage saveImage(ProductImage pi) {
        return imageRepo.save(pi);

    }
}
