package com.example.mediconnectwettasinghe_pharmaceutical_distributors.controller;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.dto.DashboardSummary;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    //GET /api/dashboard/summary?lowStock=10
    @GetMapping("/summary")
    public DashboardSummary summary(
            @RequestParam(name = "lowStock", defaultValue = "10") int lowStock
    ) {
        return service.getSummary(lowStock);
    }
}



