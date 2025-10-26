package com.example.mediconnectwettasinghe_pharmaceutical_distributors.config;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.AppUser;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.Role;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo.RoleRepo;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepo roleRepo;
    private final UserRepo userRepo;
    private final PasswordEncoder encoder;

    @Override
    public void run(String... args) {
        ensureRole("ADMIN");
        ensureRole("CUSTOMER");
        ensureRole("DOCTOR");

        userRepo.findByEmail("admin@medi-connect.local").orElseGet(() -> {
            Role adminRole = roleRepo.findByRoleName("ADMIN").orElseThrow();
            AppUser admin = AppUser.builder()
                    .userName("Administrator")
                    .email("admin@medi-connect.local")
                    .passwordHash(encoder.encode("ChangeMe123!"))
                    .active(true)
                    .roles(Set.of(adminRole))
                    .build();
            return userRepo.save(admin);
        });
    }

    private void ensureRole(String name) {
        roleRepo.findByRoleName(name)
                .orElseGet(() -> roleRepo.save(Role.builder().roleName(name).build()));
    }
}
