package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Controller;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.AdminRegisterDTO;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.CustomerRegisterDTO;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.DoctorRegisterDTO;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.LoginRequest;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.AuthResponse;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.AppUser;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo.UserRepo;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service.AuthService;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.security.JwtService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:5173"})
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final UserRepo userRepo;

    // ---------- REGISTRATION ----------

    @PostMapping(value="/api/auth/customer/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> registerCustomer(@RequestBody CustomerRegisterDTO dto) {
        authService.registerCustomer(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping(value="/api/auth/admin/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> registerAdmin(@RequestBody AdminRegisterDTO dto) {
        authService.registerAdmin(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping(value="/api/auth/doctor/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerDoctor(
            @RequestPart("fullName") String fullName,
            @RequestPart("licenseNo") String licenseNo,
            @RequestPart("email") String email,
            @RequestPart(value="phone", required=false) String phone,
            @RequestPart(value="address", required=false) String address,
            @RequestPart("password") String password,
            @RequestPart(value="licenseUpload", required=false) MultipartFile licenseUpload
    )  {

        // Store licenseUpload if you want and pass path into DTO
        DoctorRegisterDTO dto = new DoctorRegisterDTO(fullName, licenseNo, email, phone, address, password);
        authService.registerDoctor(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // ---------- LOGIN (return JWT) ----------

    @PostMapping(value="/api/auth/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthResponse> loginCustomer(@RequestBody LoginRequest req) {
        return doLogin(req);
    }

    @PostMapping(value="/api/admin/auth/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthResponse> loginAdmin(@RequestBody LoginRequest req) {
        return doLogin(req);
    }

    @PostMapping(value="/api/doctor/auth/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthResponse> loginDoctor(@RequestBody LoginRequest req) {
        return doLogin(req);
    }

    private ResponseEntity<AuthResponse> doLogin(LoginRequest req) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        AppUser user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        String jwt = jwtService.generateToken(user);

        // If AuthResponse(String token) exists:
        return ResponseEntity.ok(new AuthResponse(jwt));
    }

}
