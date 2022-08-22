package my.investment.fd;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import my.investment.fd.Classes.Gender;
import my.investment.fd.Classes.Role;
import my.investment.fd.Entities.User;
import my.investment.fd.Repositories.UserRepository;
import net.bytebuddy.asm.Advice.Local;


@Component
public class OnServerStart {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @EventListener(ApplicationReadyEvent.class)
    public void startUp() {
        String password = passwordEncoder.encode("password");
        LocalDate date = LocalDate.now();

        // Create 2 users and insert into database
        User user1 = new User(
            1l, 
            date, 
            Gender.M, 
            "AdmiJW", 
            password, 
            "Jun Wei", 
            "abc@gmail.com", 
            date, 
            Role.ROLE_ADMIN, 
            null
        );
        User user2 = new User(
            2l, 
            date, 
            Gender.M, 
            "AdmiJW2", 
            password, 
            "Jun Wei 2", 
            "abc2@gmail.com", 
            date, 
            Role.ROLE_USER, 
            null
        );

        userRepository.save(user1);
        userRepository.save(user2);
    }

}
