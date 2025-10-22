package com.example.mediconnectwettasinghe_pharmaceutical_distributors.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class AddToCartDto {
    private Integer userId;      // required
    private Long cartId;         // optional; if null we use/create active cart of user
    private Integer itemId;      // required
    private Integer quantity;    // required
    private BigDecimal unitPrice; // optional; if null keep previous snapshot
}