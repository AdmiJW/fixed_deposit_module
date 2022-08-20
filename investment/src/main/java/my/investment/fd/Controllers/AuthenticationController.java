package my.investment.fd.Controllers;


import java.util.Collections;

import javax.servlet.http.HttpSession;

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


import my.investment.fd.DTO.LoginDTO;
import my.investment.fd.DTO.RegistrationDTO;
import my.investment.fd.Entities.User;
import my.investment.fd.Repositories.UserRepository;




@Controller
@RequestMapping(path="/auth")
public class AuthenticationController {

    // Repository Dependency Injection
    @Autowired
    private UserRepository userRepository;

    // Password encoder
    @Autowired
    private PasswordEncoder passwordEncoder;



    //===============================
    // Controller methods
    //===============================
    @PostMapping(path="/login")
    public ResponseEntity<Object> login(
        @RequestBody LoginDTO dto,
        HttpSession session
    ) {
        // Find user by username
        User user = userRepository.findByUsername(dto.getUsername());
        if (user == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        if ( !passwordEncoder.matches(dto.getPassword(), user.getPassword()) )
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect password");

        // Set user id into session
        session.setAttribute("userId", user.getId() );
        session.setMaxInactiveInterval( dto.getRememberMe()? -1: 60 * 60 ); // 1 hour until session expiry
        return ResponseEntity.ok( user );
    }


    @PostMapping(path="/register")
    public ResponseEntity<Object> register(
        @RequestBody RegistrationDTO dto
    ) {
        // Check if user already exists
        if (userRepository.findByUsername(dto.getUsername() ) != null)
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
        // Set password
        dto.setPassword( passwordEncoder.encode(dto.getPassword() ) );
        // Save user
        userRepository.save( dto.toEntity() );
        return ResponseEntity.ok( Collections.singletonMap("message", "Registration successful. Please proceed to login") );
    }


    @RequestMapping(path="/logout")
    public ResponseEntity<Object> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok().body( Collections.singletonMap("message", "Log out successful") );
    }


    @GetMapping(path="/is_logged_in")
    public ResponseEntity<Object> isLoggedIn(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if ( userId == null) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not logged in");
        return ResponseEntity.ok().body( userRepository.findById(userId) );
    }
}