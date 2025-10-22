package com.example.mediconnectwettasinghe_pharmaceutical_distributors.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CartResponse {
    private List<CartItemDto> items;
    private BigDecimal grandTotal;
}
