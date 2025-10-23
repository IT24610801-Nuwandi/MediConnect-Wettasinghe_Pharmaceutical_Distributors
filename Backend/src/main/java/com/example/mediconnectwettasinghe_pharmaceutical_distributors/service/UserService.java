package com.example.mediconnectwettasinghe_pharmaceutical_distributors.service;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.User;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.repo.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {
    private final UserRepo repo;

    public UserService(UserRepo repo) { this.repo = repo; }

    public List<User> list() { return repo.findAll(); }

    public User get(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public User create(User u) { return repo.save(u); }

    public User update(Integer id, User incoming) {
        User db = get(id);
        db.setUserName(incoming.getUserName());
        db.setAddress(incoming.getAddress());
        db.setPhone(incoming.getPhone());
        db.setEmail(incoming.getEmail());
        db.setIsActive(incoming.getIsActive());
        return repo.save(db);
    }

    public void delete(Integer id) { repo.deleteById(id); }
}

