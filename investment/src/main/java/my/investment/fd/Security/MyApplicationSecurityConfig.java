package my.investment.fd.Security;


import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
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
            .cors()
                .and()
            // If not disable, Spring Security will check for CSRF tokens in POST (Unless you implement CSRF.)
            // and return 403 Forbidden if it doesn't find one.
            .csrf()
                .disable()
            .formLogin()
                .loginPage("/auth/login")
                .loginProcessingUrl("/auth/login")
                .defaultSuccessUrl("/auth/login_success")
                .failureUrl("/auth/login_failure")
                .permitAll()
                .and()
            // Since we are using React, no logout form is needed from Spring
            .logout()
                .logoutUrl("/auth/logout")
                .logoutSuccessUrl("/auth/logout_success")
                .and()
            .rememberMe()
                .rememberMeParameter("rememberMe")
                .tokenValiditySeconds(60 * 60 * 24 * 14) // 2 weeks
                .and()
            .authorizeRequests()
                // We mainly implement method security in controllers
                .anyRequest()
                    .permitAll()
                .and();

        return http.build();
    }


    // Register a password encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


    // Register UserDetailsService bean
    @Bean
    public UserDetailsService userDetailsService() {
        return new InvestUserDetailsService();
    }



    // With Spring Security, this is the way to configure CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
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


    // Register a AuthenticationProvider bean to login users
    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}