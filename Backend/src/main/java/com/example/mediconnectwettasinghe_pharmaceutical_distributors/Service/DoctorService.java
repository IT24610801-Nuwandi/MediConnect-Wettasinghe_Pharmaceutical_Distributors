package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.*;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.Doctor;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo.DoctorRepo;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.security.JwtService;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.security.DoctorUserDetails;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private static final Logger logger = LoggerFactory.getLogger(DoctorService.class);

    private final DoctorRepo doctorRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final FileStorageService fileStorageService;
    private final ProductService productService;
    private final OrderService orderService;

    @Transactional
    public DoctorResponseDTO registerDoctor(DoctorRegisterDTO dto, MultipartFile licenseFile) {
        if (doctorRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }

        String licensePath = fileStorageService.storeFile(licenseFile, "license");

        Doctor doctor = new Doctor();
        doctor.setFullName(dto.getFullName());
        doctor.setEmail(dto.getEmail());
        doctor.setPassword(passwordEncoder.encode(dto.getPassword()));
        doctor.setLicenseNumber(dto.getLicenseNumber());
        doctor.setSpecialization(dto.getSpecialization());
        doctor.setContactNumber(dto.getContactNumber());
        doctor.setLicenseFilePath(licensePath);
        doctor.setVerified(false);
        doctor.setVerificationStatus("PENDING");

        doctorRepository.save(doctor);
        logger.info("Doctor registered: {}", doctor.getEmail());

        return toDto(doctor, null);
    }

    public DoctorResponseDTO loginDoctor(DoctorLoginDTO dto) {
        Doctor doctor = doctorRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> {
                    logger.warn("Login failed: Doctor not found for email {}", dto.getEmail());
                    return new IllegalArgumentException("Doctor not found");
                });

        if (!passwordEncoder.matches(dto.getPassword(), doctor.getPassword())) {
            logger.warn("Login failed: Invalid credentials for {}", dto.getEmail());
            throw new IllegalArgumentException("Invalid credentials");
        }

        logger.info("Login attempt: {} | Verified: {}", doctor.getEmail(), doctor.isVerified());

        if (!doctor.isVerified()) {
            return toDto(doctor, null);
        }

        DoctorUserDetails userDetails = new DoctorUserDetails(doctor);
        String token = jwtService.generateToken(userDetails);
        return toDto(doctor, token);
    }

    private DoctorResponseDTO toDto(Doctor doctor, String token) {
        return new DoctorResponseDTO(
                doctor.getId(),
                doctor.getFullName(),
                doctor.getEmail(),
                doctor.isVerified(),
                doctor.getLicenseNumber(),
                doctor.getSpecialization(),
                doctor.getContactNumber(),
                doctor.getProfileImageUrl(),
                doctor.getLicenseFilePath(),
                token,
                doctor.getVerificationStatus()
        );
    }

    public List<DoctorResponseDTO> getPendingDoctors() {
        return doctorRepository.findByVerificationStatus("PENDING")
                .stream()
                .map(d -> toDto(d, null))
                .toList();
    }

    @Transactional
    public void updateVerificationStatus(Long id, String status) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> {
                    logger.warn("Verification update failed: Doctor ID {} not found", id);
                    return new IllegalArgumentException("Doctor not found");
                });

        switch (status.toUpperCase()) {
            case "APPROVE" -> {
                doctor.setVerified(true);
                doctor.setVerificationStatus("VERIFIED");
                logger.info("Doctor approved: {}", doctor.getEmail());
            }
            case "REJECT" -> {
                doctor.setVerified(false);
                doctor.setVerificationStatus("REJECTED");
                logger.info("Doctor rejected: {}", doctor.getEmail());
            }
            default -> {
                logger.warn("Invalid verification status: {}", status);
                throw new IllegalArgumentException("Invalid status: must be APPROVE or REJECT");
            }
        }

        doctorRepository.save(doctor);
    }

    public DoctorResponseDTO getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> {
                    logger.warn("Doctor fetch failed: ID {} not found", id);
                    return new IllegalArgumentException("Doctor not found");
                });
        return toDto(doctor, null);
    }

    // ✅ Unified dashboard with all products and orders
    public DoctorDashboardDTO getDoctorDashboard(String email) {
        Doctor doctor = doctorRepository.findByEmail(email)
                .orElseThrow(() -> {
                    logger.warn("Dashboard fetch failed: Doctor not found for email {}", email);
                    return new IllegalArgumentException("Doctor not found");
                });

        List<ProductDTO> products = productService.list();
        List<OrderDto> orders = orderService.listByUser(doctor.getId().intValue());

        logger.info("Dashboard loaded for doctor: {}", doctor.getEmail());

        return new DoctorDashboardDTO(
                doctor.getFullName(),
                doctor.getEmail(),
                doctor.getLicenseNumber(),
                doctor.getSpecialization(),
                doctor.getContactNumber(),
                doctor.getProfileImageUrl(),
                products,
                orders
        );
    }
}
