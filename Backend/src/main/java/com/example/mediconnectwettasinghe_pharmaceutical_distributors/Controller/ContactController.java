package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Controller;


import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.ContactDTO;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.ContactMessage;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo.ContactMessageRepo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
@Validated
@RequiredArgsConstructor
public class ContactController {

    private final ContactMessageRepo repo;

    /**
     * Save a new contact message
     */
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody ContactDTO dto,
                                    UriComponentsBuilder uriBuilder) {
        try {
            ContactMessage msg = ContactMessage.builder()
                    .name(dto.name())
                    .email(dto.email())
                    .subject(dto.subject())
                    .message(dto.message())
                    .build();

            ContactMessage saved = repo.save(msg);

            URI location = uriBuilder
                    .path("/api/contact/{id}")
                    .buildAndExpand(saved.getId())
                    .toUri();

            return ResponseEntity.created(location).body(saved);
        } catch (DataIntegrityViolationException ex) {
            // Most likely from the FK (email must exist in user table)
            return ResponseEntity.badRequest()
                    .body("Email is not registered. Please use an existing account email.");
        }
    }

    /**
     * List all contact messages (useful for admin UI)
     */
    @GetMapping
    public List<ContactMessage> list() {
        return repo.findAll();
    }

    /**
     * Get a single message by id
     */
    @GetMapping("/{id}")
    public ResponseEntity<ContactMessage> get(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Optional: list messages for a particular email
     */
    @GetMapping("/by-email")
    public List<ContactMessage> byEmail(@RequestParam String email) {
        return repo.findByEmailOrderBySentAtDesc(email);
    }
}
