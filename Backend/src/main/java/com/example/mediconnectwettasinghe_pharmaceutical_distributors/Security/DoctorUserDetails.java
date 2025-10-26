package com.example.mediconnectwettasinghe_pharmaceutical_distributors.security;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.Doctor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class DoctorUserDetails implements UserDetails {

    private final Doctor doctor;

    public DoctorUserDetails(Doctor doctor) {
        this.doctor = doctor;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_DOCTOR"));
    }

    @Override
    public String getPassword() {
        return doctor.getPassword();
    }

    @Override
    public String getUsername() {
        return doctor.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return doctor.isVerified();
    }
}
