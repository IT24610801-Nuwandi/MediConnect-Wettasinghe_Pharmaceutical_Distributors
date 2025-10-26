package com.example.mediconnectwettasinghe_pharmaceutical_distributors.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${security.jwt.secret-base64}")
    private String secretKey;

    @Value("${security.jwt.expiration-seconds}")
    private long expirationSeconds;

    /**
     * Generates a JWT token for the given user with roles embedded as claims.
     */
    public String generateToken(UserDetails user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername()) // typically the email
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationSeconds * 1000))
                .signWith(getSigningKey(), io.jsonwebtoken.SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extracts the subject (usually email or username) from the token.
     */
    public String extractSubject(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extracts a specific claim from the token using a resolver function.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claimsResolver.apply(claims);
    }

    /**
     * Validates the token by checking subject match and expiration.
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String subject = extractSubject(token);
        return subject != null &&
                subject.equals(userDetails.getUsername()) &&
                !isTokenExpired(token);
    }

    /**
     * Checks whether the token has expired.
     */
    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    /**
     * Decodes the base64-encoded secret key and returns a signing key.
     */
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
