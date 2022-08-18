package my.investment.fd.DTO;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
import my.investment.fd.Classes.FdStatus;
import my.investment.fd.Entities.FixedDeposit;

// Fixed Deposit DTO as required in lists
@Getter
@Setter
public class FdListDTO {
    private Long id;
    private String name;
    private String bank;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double principalAmount;
    private Double interestRate;
    private Double interestAmount;
    private String registeredBy;
    private FdStatus status;
    private Double totalAddition;
    private Double totalWithdrawal;


    
    public static FdListDTO fromEntity(FixedDeposit fd) {
        FdListDTO dto = new FdListDTO();
        dto.setId(fd.getId());
        dto.setName(fd.getName());
        dto.setBank(fd.getBank());
        dto.setStartDate(fd.getStartDate());
        dto.setEndDate(fd.getEndDate());
        dto.setPrincipalAmount(fd.getPrincipalAmount());
        dto.setInterestRate(fd.getInterestRate());
        dto.setInterestAmount(fd.getInterestAmount());
        dto.setRegisteredBy(fd.getUser().getName());
        dto.setStatus(fd.getStatus());
        dto.setTotalAddition(fd.getTotalAddition());
        dto.setTotalWithdrawal(fd.getTotalWithdrawal());
        return dto;
    }
}
