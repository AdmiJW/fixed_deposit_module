package my.investment.fd.Controllers;


import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.server.ResponseStatusException;

import my.investment.fd.Classes.Role;
import my.investment.fd.DTO.RegistrationDTO;
import my.investment.fd.Entities.User;
import my.investment.fd.Repositories.UserRepository;
import my.investment.fd.Security.AuthUtil;




@Controller
@RequestMapping(path="/auth")
public class AuthenticationController {

    // Repository Dependency Injection
    @Autowired
    private UserRepository userRepository;
    
    // Password Encoder
    @Autowired
    private PasswordEncoder passwordEncoder;


    //===============================
    // Controller methods
    //===============================
    @GetMapping(path="/login")
    public ResponseEntity<Object> loginRoute() {
        if (AuthUtil.isLoggedIn())
            return ResponseEntity.ok( Collections.singletonMap("message", "Already logged in") );

        throw new ResponseStatusException( HttpStatus.UNAUTHORIZED, "Not logged in.");
    }


    @GetMapping(path="/login_success")
    public ResponseEntity<Object> getLoginSuccess() {
        return ResponseEntity.ok( AuthUtil.getCurrentUser() );
    }

    @GetMapping(path="/login_failure")
    public ResponseEntity<Object> getLoginFailure() {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
    }


    @GetMapping(path="/ip_block")
    public ResponseEntity<Object> getIpBlock() {
        throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "IP is blocked for 24 hours.");
    }


    @PostMapping(path="/register")
    public ResponseEntity<Object> registerRoute(
        @RequestBody RegistrationDTO dto
    ) {
        // Check if user already exists
        if (userRepository.existsByUsername(dto.getUsername() ))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username " + dto.getUsername() + " already exists");
        
        // Only admins can register a new admin
        if (dto.getRole() == Role.ROLE_ADMIN && !AuthUtil.isAdmin( AuthUtil.getCurrentUser() ) )
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only admins can register new admins");

        // Set password
        dto.setPassword( passwordEncoder.encode(dto.getPassword() ) );
        // Save user
        userRepository.save( dto.toEntity() );
        return ResponseEntity.ok( Collections.singletonMap("message", "Registration successful. Please proceed to /auth/login") );
    }


    @GetMapping(path="/logout_success")
    public ResponseEntity<Object> logoutRoute() {
        return ResponseEntity.ok().body( Collections.singletonMap("message", "Log out successful") );
    }


    @GetMapping(path="/is_logged_in")
    public ResponseEntity<Object> isLoggedInRoute() {
        User u = AuthUtil.getCurrentUser();
        if ( u == null) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not logged in");
        return ResponseEntity.ok().body( u );
    }
}