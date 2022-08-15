package my.investment.fd.Entities;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate dateStart;
    private LocalDate dateEnd;
    private Double amountStart;
    private Double amountEnd;

    
    // FixedDeposit (Many to One)
    @ManyToOne
    @JoinColumn(name = "fixedDeposit", referencedColumnName = "id")
    @JsonBackReference
    private FixedDeposit fixedDeposit;


    public Schedule() {}

    public Schedule(
        LocalDate dateStart, 
        LocalDate dateEnd, 
        Double amountStart, 
        Double amountEnd
    ) {
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.amountStart = amountStart;
        this.amountEnd = amountEnd;
    }
}
