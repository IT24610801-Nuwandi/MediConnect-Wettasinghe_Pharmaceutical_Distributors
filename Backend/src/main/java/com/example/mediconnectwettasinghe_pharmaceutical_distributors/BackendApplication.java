package com.example.mediconnectwettasinghe_pharmaceutical_distributors;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
        scanBasePackages = "com.example.mediconnectwettasinghe_pharmaceutical_distributors"
)
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
}