package my.investment.fd.DTO;

import java.time.LocalDate;
import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;
import my.investment.fd.Classes.Gender;
import my.investment.fd.Classes.Role;
import my.investment.fd.Entities.User;

@Getter
@Setter
public class RegistrationDTO {
    private Gender gender;
    private String username;
    private String password;
    private String name;
    private String email;
    private LocalDate birthDate;
    private Role role;


    public User toEntity() {
        User u = new User();
        u.setBirthDate(birthDate);
        u.setEmail(email);
        u.setUsername(username);
        u.setPassword(password);
        u.setGender(gender);
        u.setName(name);
        u.setRegisteredDate( LocalDate.now() );
        u.setFixedDeposits( new ArrayList<>() );
        u.setRole(role);
        return u;
    }
}
