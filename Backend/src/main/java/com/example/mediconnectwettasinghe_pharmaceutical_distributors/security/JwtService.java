//package com.example.mediconnectwettasinghe_pharmaceutical_distributors.security;
//
//import io.jsonwebtoken.*;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import javax.crypto.SecretKey;
//import java.time.Instant;
//import java.util.Date;
//import java.util.Map;
//
//@Service
//public class JwtService {
//
//    private final SecretKey key;
//    private final long ttlMinutes;
//
//    public JwtService(
//            @Value("${app.jwt.secret}") String secret,
//            @Value("${app.impersonation.ttl-minutes:15}") long ttlMinutes
//    ) {
//        this.key = Keys.hmacShaKeyFor(secret.getBytes());
//        this.ttlMinutes = ttlMinutes;
//    }
//
//    public String issue(Map<String, Object> claims, String subject) {
//        Instant now = Instant.now();
//        Instant exp = now.plusSeconds(ttlMinutes * 60);
//        return Jwts.builder()
//                .setClaims(claims)
//                .setSubject(subject)
//                .setIssuedAt(Date.from(now))
//                .setExpiration(Date.from(exp))
//                .signWith(key, SignatureAlgorithm.HS256)
//                .compact();
//    }
//
//    public Jws<Claims> parse(String token) {
//        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
//    }
//}
