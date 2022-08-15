package my.investment.fd.DTO;

import lombok.Getter;
import lombok.Setter;
import my.investment.fd.Entities.Addition;
import my.investment.fd.Entities.Withdrawal;

@Getter
@Setter
public class FdAdditionWithdrawalDTO {
    private Long id;
    private Long fixedDepositId;
    private Double amount;


    public static FdAdditionWithdrawalDTO fromEntity(Withdrawal w) {
        FdAdditionWithdrawalDTO dto = new FdAdditionWithdrawalDTO();
        dto.setId(w.getId());
        dto.setFixedDepositId(w.getFixedDeposit().getId());
        dto.setAmount(w.getAmount());
        return dto;
    }

    public static FdAdditionWithdrawalDTO fromEntity(Addition a) {
        FdAdditionWithdrawalDTO dto = new FdAdditionWithdrawalDTO();
        dto.setId(a.getId());
        dto.setFixedDepositId(a.getFixedDeposit().getId());
        dto.setAmount(a.getAmount());
        return dto;
    }
}
