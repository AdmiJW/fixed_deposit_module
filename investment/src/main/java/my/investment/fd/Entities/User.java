package my.investment.fd.Entities;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;
import my.investment.fd.Classes.Gender;
import my.investment.fd.Classes.Role;

@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate registeredDate;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String username;
    @JsonIgnore
    private String password;
    private String name;
    private String email;
    private LocalDate birthDate;
    @Enumerated(EnumType.STRING)
    private Role role;

    // FixedDeposit (One To Many)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<FixedDeposit> fixedDeposits;

    
    public User() {}
}
