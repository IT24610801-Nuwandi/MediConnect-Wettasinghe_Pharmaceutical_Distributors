package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Controller;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.*;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.AppUser;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service.AuthService;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175"})
@RestController
@RequiredArgsConstructor
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    // ---------- REGISTRATION ----------

    @PostMapping(value="/api/auth/customer/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> registerCustomer(@RequestBody CustomerRegisterDTO dto) {
        authService.registerCustomer(dto);
        logger.info("Customer registered: {}", dto.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping(value="/api/auth/admin/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> registerAdmin(@RequestBody AdminRegisterDTO dto) {
        authService.registerAdmin(dto);
        logger.info("Admin registered: {}", dto.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping(value="/api/auth/doctor/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<DoctorResponseDTO> registerDoctor(
            @ModelAttribute @Valid DoctorRegisterDTO dto,
            @RequestPart("licenseUpload") MultipartFile licenseUpload
    ) {
        DoctorResponseDTO response = authService.registerDoctor(dto, licenseUpload);
        logger.info("Doctor registration submitted: {}", dto.getEmail());
        return ResponseEntity.ok(response);
    }

    // ---------- LOGIN ----------

    @PostMapping(value="/api/auth/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthResponse> loginCustomer(@RequestBody LoginRequest req) {
        return doLogin(req, "CUSTOMER");
    }

    @PostMapping(value="/api/admin/auth/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthResponse> loginAdmin(@RequestBody LoginRequest req) {
        return doLogin(req, "ADMIN");
    }

    @PostMapping(value="/api/doctor/auth/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DoctorResponseDTO> loginDoctor(@RequestBody DoctorLoginDTO dto) {
        DoctorResponseDTO response = authService.loginDoctor(dto);
        logger.info("Doctor login attempt: {} | Status: {}", dto.getEmail(), response.getVerificationStatus());
        return ResponseEntity.ok(response);
    }

    private ResponseEntity<AuthResponse> doLogin(LoginRequest req, String roleLabel) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        AppUser user = authService.findUserByEmail(req.getEmail());
        String jwt = jwtService.generateToken(user);
        logger.info("{} login successful: {}", roleLabel, req.getEmail());
        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    // ---------- GET CURRENT USER INFO ----------

    @GetMapping("/api/admin/auth/me")
    public ResponseEntity<AdminInfoResponse> getAdminInfo(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.substring(7);
            String email = jwtService.extractSubject(token);
            AppUser user = authService.findUserByEmail(email);

            String primaryRole = user.getRoles().isEmpty() ? "USER" :
                    user.getRoles().iterator().next().getRoleName();

            return ResponseEntity.ok(new AdminInfoResponse(user.getId(), user.getUserName(), user.getEmail(), primaryRole));
        } catch (Exception e) {
            logger.warn("Failed to fetch admin info: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    public static class AdminInfoResponse {
        private final Integer userId;
        private final String userName;
        private final String email;
        private final String role;

        public AdminInfoResponse(Integer userId, String userName, String email, String role) {
            this.userId = userId;
            this.userName = userName;
            this.email = email;
            this.role = role;
        }

        public Integer getUserId() { return userId; }
        public String getUserName() { return userName; }
        public String getEmail() { return email; }
        public String getRole() { return role; }
    }
}
