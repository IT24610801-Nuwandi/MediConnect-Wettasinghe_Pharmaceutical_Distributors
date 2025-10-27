package com.example.mediconnectwettasinghe_pharmaceutical_distributors.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // Let CORS preflight requests pass
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = header.substring(7);
        String username = null;

        try {
            username = jwtService.extractSubject(token); // subject = email/username
        } catch (Exception ignored) {
            // bad token format → just continue as unauthenticated
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtService.isTokenValid(token, userDetails)) {
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // **** CRITICAL LINE: authenticate the request ****
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        filterChain.doFilter(request, response);
    }
}
//package com.example.mediconnectwettasinghe_pharmaceutical_distributors.security;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jws;
//import jakarta.servlet.*;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.util.StringUtils;
//
//import java.io.IOException;
//import java.util.*;
//
//public class JwtAuthFilter implements Filter {
//
//    private final JwtService jwtService;
//
//    public JwtAuthFilter(JwtService jwtService) {
//        this.jwtService = jwtService;
//    }
//
//    @Override public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
//            throws IOException, ServletException {
//
//        HttpServletRequest req = (HttpServletRequest) request;
//        String bearer = req.getHeader("Authorization"); // "Bearer <token>"
//
//        if (StringUtils.hasText(bearer) && bearer.startsWith("Bearer ")) {
//            String token = bearer.substring(7);
//            try {
//                Jws<io.jsonwebtoken.Claims> jws = jwtService.parse(token);
//                Claims c = jws.getBody();
//                String sub = c.getSubject();
//                List<String> roles = (List<String>) c.getOrDefault("roles", List.of());
//                List<SimpleGrantedAuthority> auths = roles.stream()
//                        .map(r -> new SimpleGrantedAuthority("ROLE_" + r))
//                        .toList();
//
//                // we preserve impersonation claims if present
//                Integer actAsUserId = (Integer) c.get("act_as_user_id");
//                Integer actorAdminId = (Integer) c.get("actor_admin_id");
//
//                Map<String, Object> details = new HashMap<>();
//                if (actAsUserId != null) details.put("act_as_user_id", actAsUserId);
//                if (actorAdminId != null) details.put("actor_admin_id", actorAdminId);
//
//                var authentication = new UsernamePasswordAuthenticationToken(sub, "N/A", auths);
//                authentication.setDetails(details);
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//
//            } catch (Exception ignore) { /* invalid/expired token -> continue as anonymous */ }
//        }
//
//        chain.doFilter(request, response);
//    }
//}
