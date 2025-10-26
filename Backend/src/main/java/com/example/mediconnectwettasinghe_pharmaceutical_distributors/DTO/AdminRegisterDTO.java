package com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO;
import lombok.Data;

@Data

public class AdminRegisterDTO {
    private String fullName;   // your frontend sends fullName = email for admin:contentReference[oaicite:8]{index=8}
    private String email;
    private String password;
}
