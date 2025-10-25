package com.example.mediconnectwettasinghe_pharmaceutical_distributors.controller;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.User1;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.service.User1Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class User1Controller {

    private final User1Service svc;

    public User1Controller(User1Service svc) { this.svc = svc; }

    @GetMapping
    public List<User1> list() { return svc.list(); }

    @GetMapping("/{id}")
    public User1 get(@PathVariable Integer id) { return svc.get(id); }

    @PostMapping
    public User1 create(@RequestBody User1 u) { return svc.create(u); }

    @PutMapping("/{id}")
    public User1 update(@PathVariable Integer id, @RequestBody User1 u) { return svc.update(id, u); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) { svc.delete(id); }
}

