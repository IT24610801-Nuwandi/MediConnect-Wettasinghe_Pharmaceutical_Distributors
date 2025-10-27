package com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class OrderItemDto {
    private Integer itemId;
    private BigDecimal unitPrice;
    private Integer quantity;
    private BigDecimal lineTotal;
}
