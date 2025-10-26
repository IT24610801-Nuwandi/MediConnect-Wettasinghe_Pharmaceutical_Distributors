package com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
    private Integer userid;
    private String userName;
    private String email;
    private String phone;
    private String address;
}
