package com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateProfileRequest {

    @Size(max = 50)
    private String userName;

    @Email
    private String email;

    @Size(max = 20)
    private String phone;

    @Size(max = 200)
    private String address;

    // optional: only if user is changing password
    @Size(min = 6, max = 255)
    private String newPassword;
}
