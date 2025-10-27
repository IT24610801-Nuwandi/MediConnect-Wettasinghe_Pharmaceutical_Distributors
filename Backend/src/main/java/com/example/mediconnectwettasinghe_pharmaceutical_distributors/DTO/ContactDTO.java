package com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactDTO(
        @NotBlank @Size(max = 100) String name,
        @NotBlank @Email @Size(max = 120) String email,
        @NotBlank @Size(max = 100) String subject,
        @NotBlank @Size(max = 1000) String message
) {}

