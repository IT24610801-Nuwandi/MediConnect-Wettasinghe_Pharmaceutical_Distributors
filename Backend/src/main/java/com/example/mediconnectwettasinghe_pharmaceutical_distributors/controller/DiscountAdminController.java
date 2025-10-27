package com.example.mediconnectwettasinghe_pharmaceutical_distributors.Controller;//package com.MEDICONNECT.OrderM.controller;
//
//import com.MEDICONNECT.OrderM.entity.Discount;
//import com.MEDICONNECT.OrderM.service.DiscountService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.math.BigDecimal;
//import java.time.LocalDate;
//
//@RestController
//@RequestMapping("/api/admin/discounts")
//@RequiredArgsConstructor
//@CrossOrigin(origins = "*")
//public class DiscountAdminController {
//    private final DiscountService svc;
//
//    @PostMapping("/auto")
//    public Discount createAuto(@RequestParam(required = false) BigDecimal percentOff,
//                               @RequestParam(required = false) BigDecimal amountOff,
//                               @RequestParam(defaultValue = "Auto promo") String description,
//                               @RequestParam(required = false) String startDate,
//                               @RequestParam(required = false) String endDate) {
//        var start = startDate != null ? LocalDate.parse(startDate) : LocalDate.now();
//        var end   = endDate   != null ? LocalDate.parse(endDate)   : start.plusMonths(1);
//        return svc.createAuto(percentOff, amountOff, description, start, end);
//    }
//}
