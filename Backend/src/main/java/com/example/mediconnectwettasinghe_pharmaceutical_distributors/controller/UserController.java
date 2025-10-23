package com.example.mediconnectwettasinghe_pharmaceutical_distributors.controller;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.User;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService svc;

    public UserController(UserService svc) { this.svc = svc; }

    @GetMapping
    public List<User> list() { return svc.list(); }

    @GetMapping("/{id}")
    public User get(@PathVariable Integer id) { return svc.get(id); }

    @PostMapping
    public User create(@RequestBody User u) { return svc.create(u); }

    @PutMapping("/{id}")
    public User update(@PathVariable Integer id, @RequestBody User u) { return svc.update(id, u); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) { svc.delete(id); }
}

