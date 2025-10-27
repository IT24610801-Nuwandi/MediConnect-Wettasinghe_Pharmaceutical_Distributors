package com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
// `order` is reserved — keep the backticks so Hibernate quotes it
@Table(name = "`order`")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OrderHdr {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    // DB default will set this
    @Column(name = "order_date", insertable = false, updatable = false)
    private LocalDateTime orderDate;

    @Column(name = "status", nullable = false, length = 30)
    private String status;

    @Column(name="promo_code")
    private String promoCode;


    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items;
}
