package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Repo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.Entity.Doctor;
import java.util.Optional;

public interface DoctorRepo extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByEmail(String email);

    List<Doctor> findByVerificationStatus(String status);
}

