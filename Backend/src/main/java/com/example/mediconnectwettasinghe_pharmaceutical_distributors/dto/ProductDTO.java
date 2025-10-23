package com.example.mediconnectwettasinghe_pharmaceutical_distributors.dto;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.Product;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Integer itemId;
    private String itemCode;
    private String itemName;
    private String brand;
    private String agency;
    private String category;
    private String strength;
    private String size;
    private String marketName;
    private BigDecimal priceRetail;
    private Integer qtyRetail;
    private BigDecimal priceWholesale;
    private Integer qtyWholesale;
    private String purchaseUnit;
    private String sellingUnit;
    private Boolean isNew;
    private Boolean isActive;
    private List<String> images;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Keep only your static factory method
    public static ProductDTO from(Product p) {
        var imagesSorted = p.getImages()
                .stream()
                .sorted(Comparator.comparing(img -> img.getSortOrder() == null ? 0 : img.getSortOrder()))
                .map(img -> img.getImageUrl())
                .toList();

        return new ProductDTO(
                p.getItemId(),
                p.getItemCode(),
                p.getItemName(),
                p.getBrand(),
                p.getAgency(),
                p.getCategory(),
                p.getStrength(),
                p.getSize(),
                p.getMarketName(),
                p.getPriceRetail(),
                p.getQtyRetail(),
                p.getPriceWholesale(),
                p.getQtyWholesale(),
                p.getPurchaseUnit(),
                p.getSellingUnit(),
                p.getIsNew(),
                p.getIsActive(),
                imagesSorted,
                p.getCreatedAt(),
                p.getUpdatedAt()
        );
    }
}
