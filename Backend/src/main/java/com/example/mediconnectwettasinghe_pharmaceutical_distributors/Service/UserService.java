package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.UpdateProfileRequest;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.AppUser;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser u = userRepo.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return User.withUsername(u.getEmail())
                .password(u.getPasswordHash())
                .authorities(u.getRoles().stream()
                        .map(r -> "ROLE_" + r.getRoleName())
                        .toArray(String[]::new))
                .accountLocked(!u.isActive())
                .build();
    }

    @Transactional
    public AppUser updateProfileFields(AppUser current, UpdateProfileRequest req) {
        if (req == null) return current;

        if (req.getUserName() != null && !req.getUserName().isBlank()) {
            current.setUserName(req.getUserName().trim());
        }
        if (req.getEmail() != null && !req.getEmail().isBlank()) {
            current.setEmail(req.getEmail().trim());
        }
        if (req.getPhone() != null && !req.getPhone().isBlank()) {
            current.setPhone(req.getPhone().trim());
        }
        if (req.getAddress() != null && !req.getAddress().isBlank()) {
            current.setAddress(req.getAddress().trim());
        }
        if (req.getNewPassword() != null && !req.getNewPassword().isBlank()) {
            current.setPasswordHash(passwordEncoder.encode(req.getNewPassword()));
        }

        return userRepo.save(current);
    }
}
