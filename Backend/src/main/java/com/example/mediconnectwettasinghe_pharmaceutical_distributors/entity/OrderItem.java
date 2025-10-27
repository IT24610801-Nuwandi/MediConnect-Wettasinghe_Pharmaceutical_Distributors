
package com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_item")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OrderItem {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private OrderHdr order;

    // Reference only by item_id; no Product entity
    @Column(name = "item_id", nullable = false)
    private Integer itemId;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "unit_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;
}
