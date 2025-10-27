package com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "discount")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Discount {
    @Id
    @Column(name = "promo_code", length = 30)
    private String promoCode;

    @Column(name = "description")
    private String description;

    @Column(name = "percent_off", precision = 5, scale = 2)
    private BigDecimal percentOff;

    @Column(name = "amount_off", precision = 10, scale = 2)
    private BigDecimal amountOff;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
}
