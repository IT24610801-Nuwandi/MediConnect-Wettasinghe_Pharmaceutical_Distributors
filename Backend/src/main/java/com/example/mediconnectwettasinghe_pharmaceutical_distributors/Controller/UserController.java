//// src/main/java/com/wettasinghe_pharmaceutical_distributors/Controller/UserController.java
//package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Controller;
//
//
//import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.UpdateProfileRequest;
//import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.UserDTO;
//import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.AppUser;
//import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo.UserRepo;
//import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service.UserService;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.server.ResponseStatusException;
//
//@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:5173"})
//@RestController
//@RequestMapping("/api/user") // <— IMPORTANT: not /api/auth
//@RequiredArgsConstructor
//public class UserController {
//
//    private final UserService userService;
//
//    @PutMapping("/profile")
//    public UserDTO updateMe(@AuthenticationPrincipal AppUser currentUser,
//                                                 @Valid @RequestBody UpdateProfileRequest req) {
//        AppUser updated = userService.updateProfileFields(currentUser, req);
//        return (
//                UserDTO.builder()
//                        .userid(updated.getId())
//                        .userName(updated.getUserName())
//                        .email(updated.getEmail())
//                        .phone(updated.getPhone())
//                        .address(updated.getAddress())
//                        .build()
//        );
//    }
//
//    @GetMapping("/me")
//    public UserDTO me(@AuthenticationPrincipal AppUser currentUser) {
//        return (
//                UserDTO.builder()
//                        .userid(currentUser.getId())
//                        .userName(currentUser.getUserName())
//                        .email(currentUser.getEmail())
//                        .phone(currentUser.getPhone())
//                        .address(currentUser.getAddress())
//                        .build()
//        );
//    }
//
//
//}

// src/main/java/com/wettasinghe_pharmaceutical_distributors/Controller/UserController.java
// src/main/java/com/wettasinghe_pharmaceutical_distributors/Controller/UserController.java
package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Controller;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.UpdateProfileRequest;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.DTO.UserDTO;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.AppUser;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo.UserRepo;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;

@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:5173"})
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepo userRepo;
    private final UserService userService;

    @GetMapping("/me")
    public UserDTO me(Principal principal) {
        AppUser user = userRepo.findByEmail(principal.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return toDto(user);
    }

    @PutMapping({"/me", "/profile"})
    public UserDTO updateMe(Principal principal, @Valid @RequestBody UpdateProfileRequest req) {
        AppUser current = userRepo.findByEmail(principal.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        AppUser updated = userService.updateProfileFields(current, req);
        return toDto(updated);
    }

    private static UserDTO toDto(AppUser u) {
        return UserDTO.builder()
                .userid(u.getId())
                .userName(u.getUserName())
                .email(u.getEmail())
                .phone(u.getPhone())
                .address(u.getAddress())
                .build();
    }
}



