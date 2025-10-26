package com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class DoctorDashboardDTO {
    private String fullName;
    private String email;
    private String licenseNumber;
    private String specialization;
    private String contactNumber;
    private String profileImageUrl;
    private List<ProductDTO> products;
    private List<OrderDto> orders;

}
