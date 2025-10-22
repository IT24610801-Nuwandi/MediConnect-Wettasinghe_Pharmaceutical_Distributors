package com.example.mediconnectwettasinghe_pharmaceutical_distributors.service;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.Discount;
import com.example.mediconnectwettasinghe_pharmaceutical_distributors.repo.DiscountRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class DiscountService {
    private final DiscountRepo repo;
    private static final String ALPH = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no O/0, I/1
    private static final SecureRandom RNG = new SecureRandom();

    /** Create a discount with an auto-generated unique code like MC-7K2Q-8FJD */
    @Transactional
    public Discount createAuto(BigDecimal percentOff, BigDecimal amountOff,
                               String description, LocalDate start, LocalDate end) {
        String code;
        do { code = genCode(); } while (repo.existsById(code));
        Discount d = Discount.builder()
                .promoCode(code)
                .description(description)
                .percentOff(percentOff)
                .amountOff(amountOff)
                .startDate(start)
                .endDate(end)
                .isActive(true)
                .build();
        return repo.save(d);
    }

    private String genCode() {
        return "MC-" + block(4) + "-" + block(4);
    }
    private String block(int n) {
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) sb.append(ALPH.charAt(RNG.nextInt(ALPH.length())));
        return sb.toString();
    }
}
