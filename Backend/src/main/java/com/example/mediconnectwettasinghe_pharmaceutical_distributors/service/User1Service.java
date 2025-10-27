package com.example.mediconnectwettasinghe_pharmaceutical_distributors.service;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.User1;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.repo.User1Repo;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class User1Service {
    private final User1Repo repo;

    public User1Service(User1Repo repo) { this.repo = repo; }

    public List<User1> list() { return repo.findAll(); }

    public User1 get(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public User1 create(User1 u) { return repo.save(u); }

    public User1 update(Integer id, User1 incoming) {
        User1 db = get(id);
        db.setUserName(incoming.getUserName());
        db.setAddress(incoming.getAddress());
        db.setPhone(incoming.getPhone());
        db.setEmail(incoming.getEmail());
        db.setIsActive(incoming.getIsActive());
        return repo.save(db);
    }

    public void delete(Integer id) { repo.deleteById(id); }
}

