package com.example.mediconnectwettasinghe_pharmaceutical_distributors.service;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.dto.DashboardSummary;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.repo.ProductRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final ProductRepo productRepo;

    @PersistenceContext
    private EntityManager em;   // using the existing MySQL

    public DashboardService(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    public DashboardSummary getSummary(int lowStockThreshold) {
        long doctorsPending = countNative("SELECT COUNT(*) FROM doctor WHERE UPPER(status) = 'PENDING'");
        long totalCustomers = countNative("SELECT COUNT(*) FROM `user`");
        long totalProducts  = productRepo.count();
        long lowStock       = productRepo.countByQtyRetailLessThanEqual(lowStockThreshold);

        double todaysRevenue = numberNative("""
            SELECT COALESCE(SUM(final_amount), 0)
            FROM payment
            WHERE DATE(payment_date) = CURDATE()
              AND UPPER(status) IN ('CAPTURED','PAID','AUTHORIZED')
        """);

        return new DashboardSummary(
                doctorsPending,
                totalCustomers,
                totalProducts,
                lowStock,
                todaysRevenue
        );
    }

    //helpers
    private long countNative(String sql) {
        Object v = em.createNativeQuery(sql).getSingleResult();
        return (v instanceof Number n) ? n.longValue() : Long.parseLong(String.valueOf(v));
    }

    private double numberNative(String sql) {
        Object v = em.createNativeQuery(sql).getSingleResult();
        return (v instanceof Number n) ? n.doubleValue() : Double.parseDouble(String.valueOf(v));
    }
}



