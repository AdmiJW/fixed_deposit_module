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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.Setter;
import my.investment.fd.Classes.FdStatus;
import my.investment.fd.Logic.AccountUtil;



@Entity
@Getter
@Setter
public class FixedDeposit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer period;             // In Months
    private Double principalAmount;
    private Double interestRate;
    private Double interestAmount;
    private String comment;
    private String bank;
    @Enumerated(EnumType.STRING)
    private FdStatus status;
    private Double totalAddition;
    private Double totalWithdrawal;


    // Registration (One to One)
    @OneToOne(mappedBy = "fixedDeposit", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Registration registration;

    // Schedule (One to Many)
    @OneToMany(mappedBy = "fixedDeposit", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Schedule> schedules;

    // Withdrawal (One to Many)
    @OneToMany(mappedBy = "fixedDeposit", cascade = CascadeType.ALL)
    @JsonManagedReference  
    private List<Withdrawal> withdrawals;

    // Addition (One to Many)
    @OneToMany(mappedBy = "fixedDeposit", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Addition> additions;

    // User (One to One)
    @ManyToOne
    @JoinColumn(name = "user", referencedColumnName = "id")
    @JsonManagedReference
    private User user;


    // Constructor - Set status to NEW
    public FixedDeposit() {
        this.status = FdStatus.NEW;
        this.totalAddition = 0.0;
        this.totalWithdrawal = 0.0;
    }


    // Specialized getters - Also considers additions and withdrawals
    public Double calculatePrincipalAmount() {
        return getRegistration().getInitialAmount() + calculateTotalAddition() - calculateTotalWithdrawal();
    }

    public Double calculateInterestAmount() {
        return AccountUtil.calculateInterestAmount(
            principalAmount,
            interestRate,
            period
        );
    }

    public Double calculateTotalAddition() {
        return getAdditions().stream().mapToDouble(x -> x.getAmount()).sum();
    }

    public Double calculateTotalWithdrawal() {
        return getWithdrawals().stream().mapToDouble(x -> x.getAmount()).sum();
    }

}
