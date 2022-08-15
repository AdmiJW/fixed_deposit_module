package my.investment.fd.Entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Withdrawal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double amount;


    // FixedDeposit (Many to One)
    @ManyToOne
    @JoinColumn(name = "fixedDeposit", referencedColumnName = "id")
    @JsonBackReference
    private FixedDeposit fixedDeposit;

    
    public Withdrawal() {}
}