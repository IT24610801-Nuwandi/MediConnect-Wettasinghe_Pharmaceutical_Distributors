package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Controller;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.DoctorResponseDTO;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminDoctorController {

    private final DoctorService doctorService;

    /**
     * Get all doctors with status "PENDING"
     */
    @GetMapping("/pending-doctors")
    public ResponseEntity<List<DoctorResponseDTO>> getPendingDoctors() {
        List<DoctorResponseDTO> pending = doctorService.getPendingDoctors();
        return ResponseEntity.ok(pending);
    }

    /**
     * Approve or reject a doctor by ID
     */
    @PatchMapping("/verify-doctor/{id}")
    public ResponseEntity<String> verifyDoctor(@PathVariable Long id, @RequestParam String status) {
        try {
            doctorService.updateVerificationStatus(id, status);
            return ResponseEntity.ok("Doctor " + status.toLowerCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * (Optional) Get full details of a specific doctor
     */
    @GetMapping("/doctor/{id}")
    public ResponseEntity<DoctorResponseDTO> getDoctorDetails(@PathVariable Long id) {
        DoctorResponseDTO doctor = doctorService.getDoctorById(id);
        return ResponseEntity.ok(doctor);
    }
}
