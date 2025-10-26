package com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DoctorRegisterDTO {
    private String fullName;
    private String licenseNo;
    private String email;
    private String phone;
    private String address;
    private String password;
}