package my.investment.fd.Entities;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate registeredDate;
    private String registeredBy;
    private Double initialAmount;
    private Double interestRate;
    private String bank;
    private String certificateNo;
    private String referenceNo;
    private Integer period;

    
    // FixedDeposit (One to One)
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fixedDeposit", referencedColumnName = "id")
    @JsonBackReference
    private FixedDeposit fixedDeposit;


    public Registration() {}
}
