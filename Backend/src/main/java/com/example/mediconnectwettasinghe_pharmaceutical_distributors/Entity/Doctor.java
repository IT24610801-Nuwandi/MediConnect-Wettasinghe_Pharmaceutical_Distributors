package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    private String fullName;
    private String email;
    private String password;
    private String licenseNumber;
    private boolean verified;

    private String specialization;

    @Size(min = 10, max = 15, message = "Contact number must be valid")
    private String contactNumber;

    @Column(length = 512)
    private String profileImageUrl;

    @Column(length = 512)
    private String licenseFilePath;

    private String verificationStatus;
}
