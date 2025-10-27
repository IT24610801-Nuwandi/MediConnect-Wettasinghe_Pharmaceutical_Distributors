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
