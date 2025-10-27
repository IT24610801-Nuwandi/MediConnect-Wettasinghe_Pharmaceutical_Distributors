package com.example.mediconnectwettasinghe_pharmaceutical_distributors.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record DashboardSummary(
        long doctorsPending,
        long totalCustomers,
        long totalProducts,
        long lowStockProducts,
        double todaysRevenue
) {}

