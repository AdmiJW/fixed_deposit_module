package my.investment.fd.Security;


import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class MyApplicationSecurityConfig {

    // Put the hostnames here that you want added into Access-Control-Allow-Origin header
    private static final List<String> ALLOWED_HOSTNAMES = Arrays.asList(
        "http://localhost:7208",
        "http://localhost:3000"
    );
    // Put the allowed methods here that you want added into Access-Control-Allow-Methods header
    private static final List<String> ALLOWED_METHODS = Arrays.asList(
        "GET", "POST", "PUT", "DELETE", "OPTIONS"
    );



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Enable Spring Security CORS for enhanced XSS protection
            .cors().and()
            // If not disable, Spring Security will check for CSRF tokens in POST (Unless you implement CSRF.)
            // and return 403 Forbidden if it doesn't find one.
            .csrf().disable()
            // Since we are using React, no form is needed from Spring   
            .formLogin().disable()
            // Since we are using React, no logout form is needed from Spring
            .logout().disable();

        return http.build();
    }


    // Register a password encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    // ? WebSecurity Config. Originally i use to bypass every page visit.
    // ? However, fetch API requires Access-Control-Allow-Origin header to be set, so I cannot simply bypass
    //
    // @Bean
    // public WebSecurityCustomizer webSecurityCustomizer() {
    //     return (web) -> web.ignoring().anyRequest();
    // }



    // With Spring Security, this is the way to configure CORS
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins( ALLOWED_HOSTNAMES );
        configuration.setAllowedMethods( ALLOWED_METHODS );
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(Arrays.asList("Authorization", "content-type"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "content-type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}