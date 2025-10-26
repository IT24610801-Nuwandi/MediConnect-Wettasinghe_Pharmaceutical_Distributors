package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {

    public String storeFile(MultipartFile file, String folder) {
        try {
            Path dir = Paths.get("uploads/" + folder);
            Files.createDirectories(dir);

            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = dir.resolve(filename);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/" + folder + "/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("File upload failed: " + e.getMessage());
        }
    }
}
