package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Controller;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.*;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175"})
@RestController
@RequestMapping("/api/doctor")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    // ✅ Get dashboard data (profile + products + orders)
    @GetMapping("/dashboard")
    public ResponseEntity<DoctorDashboardDTO> dashboard(@RequestParam String email) {
        return ResponseEntity.ok(doctorService.getDoctorDashboard(email));
    }

    // ✅ Get pending doctors for admin verification
    @GetMapping("/pending")
    public ResponseEntity<List<DoctorResponseDTO>> pending() {
        return ResponseEntity.ok(doctorService.getPendingDoctors());
    }

    // ✅ Update verification status
    @PutMapping("/verify/{id}")
    public ResponseEntity<Void> verify(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        doctorService.updateVerificationStatus(id, status);
        return ResponseEntity.ok().build();
    }

    // ✅ Get doctor by ID
    @GetMapping("/{id}")
    public ResponseEntity<DoctorResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }
}
