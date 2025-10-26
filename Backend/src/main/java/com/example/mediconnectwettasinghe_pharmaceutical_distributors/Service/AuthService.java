package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.AdminRegisterDTO;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.CustomerRegisterDTO;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.DoctorRegisterDTO;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.AppUser;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.Role;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo.RoleRepo;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo.UserRepo;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder encoder;

    @Transactional
    public void registerCustomer(CustomerRegisterDTO dto) {
        createUserWithRole(dto.getFullName(), dto.getAddress(), dto.getPhone(),
                dto.getEmail(), dto.getPassword(), "CUSTOMER");
    }

    @Transactional
    public void registerAdmin(AdminRegisterDTO dto) {
        createUserWithRole(dto.getFullName(), null, null,
                dto.getEmail(), dto.getPassword(), "ADMIN");
    }

    @Transactional
    public void registerDoctor(DoctorRegisterDTO dto) {
        createUserWithRole(dto.getFullName(), dto.getAddress(), dto.getPhone(),
                dto.getEmail(), dto.getPassword(), "DOCTOR");
        // TODO: persist doctor-specific fields (e.g., licenseNo, file path) if needed
    }

    private void createUserWithRole(String fullName, String address, String phone,
                                    String email, String rawPassword, String roleName) {

        if (userRepo.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already registered");
        }

        AppUser u = new AppUser();
        u.setUserName(fullName);                 // maps to `user_name`
        u.setAddress(address);
        u.setPhone(phone);
        u.setEmail(email);
        u.setPasswordHash(encoder.encode(rawPassword)); // maps to `password_hash`
        u.setActive(true);

        AppUser saved = userRepo.save(u);

        Role role = roleRepo.findByRoleName(roleName)
                .orElseThrow(() -> new IllegalStateException("Missing role: " + roleName));

        // ensure AppUser has a @ManyToMany to Role with join table `user_role`
        saved.getRoles().add(role);
    }
}
