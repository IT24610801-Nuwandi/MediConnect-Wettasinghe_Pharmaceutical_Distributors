package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactMessageRepo extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findByEmailOrderBySentAtDesc(String email);
}