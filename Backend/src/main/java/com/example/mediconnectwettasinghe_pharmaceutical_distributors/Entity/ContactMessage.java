package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "contact_message")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name", nullable=false, length=100)
    private String name;

    // FK to user(email) — we store email directly; DB FK enforces existence
    @Column(name="email", nullable=false, length=120)
    private String email;

    @Column(name="subject", nullable=false, length=100)
    private String subject;

    @Column(name="message", nullable=false, length=1000)
    private String message;

    @CreationTimestamp
    @Column(name="sent_at", nullable=false, updatable = false)
    private LocalDateTime sentAt;
}
