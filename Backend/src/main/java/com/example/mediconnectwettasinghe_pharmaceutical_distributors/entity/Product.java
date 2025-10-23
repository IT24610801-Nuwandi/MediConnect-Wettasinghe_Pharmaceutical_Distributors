package com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Integer itemId;

    @Column(name = "item_code", nullable = false, unique = true, length = 50)
    private String itemCode;

    @Column(name = "item_name", nullable = false, length = 150)
    private String itemName;

    @Column(name = "brand", length = 100)
    private String brand;

    @Column(name = "agency", length = 100)
    private String agency;

    @Column(name = "category", length = 100)
    private String category;

    @Column(name = "strength", length = 50)
    private String strength;

    @Column(name = "size", length = 50)
    private String size;

    @Column(name = "market_name", length = 150)
    private String marketName;

    @Column(name = "price_retail", precision = 10, scale = 2, nullable = false)
    private BigDecimal priceRetail;

    @Column(name = "qty_retail")
    private Integer qtyRetail;

    @Column(name = "price_wholesale", precision = 10, scale = 2)
    private BigDecimal priceWholesale;

    @Column(name = "qty_wholesale")
    private Integer qtyWholesale;

    @Column(name = "purchase_unit", length = 50)
    private String purchaseUnit;

    @Column(name = "selling_unit", length = 50)
    private String sellingUnit;

    @Column(name = "is_new", nullable = false)
    private Boolean isNew = false;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;   // DB default CURRENT_TIMESTAMP

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;   // DB ON UPDATE CURRENT_TIMESTAMP

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("sortOrder ASC")
    private List<ProductImage> images = new ArrayList<>();

    public List<ProductImage> getImages() {        // <-- this is what DTO needs
        return images;
    }
    public void setImages(List<ProductImage> images) {
        this.images = images;
    }

    // Getters and setters
    public Integer getItemId() { return itemId; }
    public void setItemId(Integer itemId) { this.itemId = itemId; }
    public String getItemCode() { return itemCode; }
    public void setItemCode(String itemCode) { this.itemCode = itemCode; }
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getAgency() { return agency; }
    public void setAgency(String agency) { this.agency = agency; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getStrength() { return strength; }
    public void setStrength(String strength) { this.strength = strength; }
    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }
    public String getMarketName() { return marketName; }
    public void setMarketName(String marketName) { this.marketName = marketName; }
    public BigDecimal getPriceRetail() { return priceRetail; }
    public void setPriceRetail(BigDecimal priceRetail) { this.priceRetail = priceRetail; }
    public Integer getQtyRetail() { return qtyRetail; }
    public void setQtyRetail(Integer qtyRetail) { this.qtyRetail = qtyRetail; }
    public BigDecimal getPriceWholesale() { return priceWholesale; }
    public void setPriceWholesale(BigDecimal priceWholesale) { this.priceWholesale = priceWholesale; }
    public Integer getQtyWholesale() { return qtyWholesale; }
    public void setQtyWholesale(Integer qtyWholesale) { this.qtyWholesale = qtyWholesale; }
    public String getPurchaseUnit() { return purchaseUnit; }
    public void setPurchaseUnit(String purchaseUnit) { this.purchaseUnit = purchaseUnit; }
    public String getSellingUnit() { return sellingUnit; }
    public void setSellingUnit(String sellingUnit) { this.sellingUnit = sellingUnit; }
    public Boolean getIsNew() { return isNew; }
    public void setIsNew(Boolean aNew) { isNew = aNew; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean active) { isActive = active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }


}
