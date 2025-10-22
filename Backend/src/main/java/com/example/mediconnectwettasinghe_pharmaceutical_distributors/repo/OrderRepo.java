package com.example.mediconnectwettasinghe_pharmaceutical_distributors.repo;

import com.example.mediconnectwettasinghe_pharmaceutical_distributors.entity.OrderHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<OrderHdr, Long> {
    List<OrderHdr> findByUserIdOrderByOrderDateDesc(Integer userId);
}