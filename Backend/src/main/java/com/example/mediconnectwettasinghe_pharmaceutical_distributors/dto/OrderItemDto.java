package com.example.mediconnectwettasinghe_pharmaceutical_distributors.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class OrderItemDto {
    private Integer itemId;
    private BigDecimal unitPrice;
    private Integer quantity;
    private BigDecimal lineTotal;
}
