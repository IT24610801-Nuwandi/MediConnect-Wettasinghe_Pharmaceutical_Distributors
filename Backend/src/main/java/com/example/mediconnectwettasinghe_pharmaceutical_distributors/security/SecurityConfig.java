//package com.example.mediconnectwettasinghe_pharmaceutical_distributors.security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain filter(HttpSecurity http) throws Exception {
//        http.csrf(csrf -> csrf.disable())
//                .cors(cors -> cors.disable())
//                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // open-all for now
//
//        return http.build();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//}
//
//
//
////package com.MEDICONNECT.OrderM.security;
////
////import org.springframework.context.annotation.Bean;
////import org.springframework.context.annotation.Configuration;
////import org.springframework.security.config.Customizer;
////import org.springframework.security.config.annotation.web.builders.HttpSecurity;
////import org.springframework.security.web.SecurityFilterChain;
////
////@Configuration
////public class SecurityConfig {
////
////    private final JwtService jwtService;
////
////    public SecurityConfig(JwtService jwtService) {
////        this.jwtService = jwtService;
////    }
////
////    @Bean
////    SecurityFilterChain filter(HttpSecurity http) throws Exception {
////        http.csrf(csrf -> csrf.disable())
////                .addFilterBefore(new JwtAuthFilter(jwtService),
////                        org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class)
////                .authorizeHttpRequests(auth -> auth
////                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
////                        .requestMatchers("/api/**").permitAll() // you can tighten this as needed
////                        .anyRequest().permitAll()
////                )
////                .httpBasic(Customizer.withDefaults());
////        return http.build();
////    }
////}
