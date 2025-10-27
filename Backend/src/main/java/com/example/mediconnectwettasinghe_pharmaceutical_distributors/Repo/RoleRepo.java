package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo;

// repo/RoleRepo.java
import java.util.Optional;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
public interface RoleRepo extends JpaRepository<Role, Integer> {
    Optional<Role> findByRoleName(String roleName);
    boolean existsByRoleName(String roleName);
}

