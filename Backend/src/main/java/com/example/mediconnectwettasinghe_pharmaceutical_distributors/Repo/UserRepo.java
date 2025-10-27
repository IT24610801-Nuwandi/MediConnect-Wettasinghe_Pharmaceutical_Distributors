package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo;

import java.util.Optional;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UserRepo extends JpaRepository<AppUser, Integer> {
    boolean existsByEmail(String email);
    Optional<AppUser> findByEmail(String email);

}
