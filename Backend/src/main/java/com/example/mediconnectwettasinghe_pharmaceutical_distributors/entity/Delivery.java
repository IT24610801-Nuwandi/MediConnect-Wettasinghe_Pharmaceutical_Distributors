package com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "delivery")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "delivery_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private OrderHdr order;

    @Column(name = "status", nullable = false, length = 30)
    private String status; // QUEUED/ASSIGNED/IN_TRANSIT/DELIVERED/FAILED

    @Column(name = "assigned_date")
    private LocalDateTime assignedDate;

    @Column(name = "delivered_date")
    private LocalDateTime deliveredDate;

    @Column(name = "provider", length = 80)
    private String provider;

    @Column(name = "tracking_no", length = 80)
    private String trackingNo;
}
