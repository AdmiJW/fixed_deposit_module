package my.investment.fd.Controllers;


import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.server.ResponseStatusException;

import my.investment.fd.DTO.LoginDTO;
import my.investment.fd.DTO.RegistrationDTO;
import my.investment.fd.Entities.FixedDeposit;
import my.investment.fd.Entities.User;
import my.investment.fd.Repositories.FixedDepositRepository;
import my.investment.fd.Repositories.UserRepository;




@Controller
@RequestMapping(path="/auth")
@CrossOrigin
public class AuthenticationController {

    // Repository Dependency Injection
    @Autowired
    private UserRepository userRepository;




    //===============================
    // Controller methods
    //===============================
    @PostMapping(path="/login")
    public ResponseEntity<Object> login(
        @RequestBody LoginDTO dto,
        HttpSession session,
        PasswordEncoder passwordEncoder
    ) {
        // Find user by username
        User user = userRepository.findByUsername(dto.getUsername());
        if (user == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        if (!passwordEncoder.encode(user.getPassword() ).equals(dto.getPassword()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");

        // Set user id into session
        session.setAttribute("userId", user.getId() );
        return ResponseEntity.ok("Login successful");
    }


    @PostMapping(path="/register")
    public ResponseEntity<Object> register(
        @RequestBody RegistrationDTO dto,
        PasswordEncoder passwordEncoder
    ) {
        // Check if user already exists
        if (userRepository.findByUsername(dto.getUsername() ) != null)
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
        // Set password
        dto.setPassword( passwordEncoder.encode(dto.getPassword() ) );
        // Save user
        userRepository.save( dto.toEntity() );
        return ResponseEntity.ok("User registered successfully");
    }


    @RequestMapping(path="/logout")
    public ResponseEntity<Object> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok().body("Logged out");
    }
}