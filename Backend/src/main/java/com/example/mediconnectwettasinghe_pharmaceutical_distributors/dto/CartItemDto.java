package com.example.mediconnectwettasinghe_pharmaceutical_distributors.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CartItemDto {
    private Long cartItemId;
    private Integer itemId;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal lineTotal;
}
