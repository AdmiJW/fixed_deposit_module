package my.investment.fd.DTO;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import my.investment.fd.Classes.FdStatus;
import my.investment.fd.Entities.FixedDeposit;
import my.investment.fd.Entities.Registration;
import my.investment.fd.Entities.Schedule;
import my.investment.fd.Logic.AccountUtil;
import my.investment.fd.Logic.GeneralUtil;


// Fixed Deposit DTO as required in a Upsert form
@Getter
@Setter
public class FdUpsertDTO {
    // Required for updating
    private Long id;

    private String name;
    private LocalDate registeredDate;
    private String bank;
    private String certificateNo;
    private String referenceNo;
    private String comment;
    private LocalDate startDate;
    private Integer period;
    private Double initialAmount;
    private Double interestRate;
    private FdStatus status;




    
    // DTO mapper methods
    public void updateToFixedDeposit(FixedDeposit fd) {
        //! ID is not set and is left as it is
        //! Status is not set and is left as it is
        //! Total Addition and Total Withdrawal are not set and are left as it is
        fd.setName(name);
        fd.setStartDate(startDate);
        fd.setEndDate(GeneralUtil.getEndDate(startDate, period));
        fd.setPeriod(period);
        fd.setPrincipalAmount(initialAmount);
        fd.setInterestRate(interestRate);
        fd.setInterestAmount( fd.calculateInterestAmount() );
        fd.setComment(comment);
        fd.setBank(bank);
    }


    public void updateToRegistration(Registration r) {
        //! ID is not set and left as it is
        r.setRegisteredDate(registeredDate);
        r.setInitialAmount(initialAmount);
        r.setInterestRate(interestRate);
        r.setBank(bank);
        r.setCertificateNo(certificateNo);
        r.setReferenceNo(referenceNo);
        r.setPeriod(period);
    }



    public List<Schedule> generateSchedules() {
        List<Schedule> schedules = new ArrayList<>();
        LocalDate curr = startDate;
        Double balance = initialAmount;
        Double gainingPerMonth = AccountUtil.calculateInterestAmount(initialAmount, interestRate, 1);

        for (int i = 0; i < period; ++i) {
            schedules.add(new Schedule(
                curr,
                GeneralUtil.getNextMonth(curr),
                balance,
                balance + gainingPerMonth
            ));

            // Carry over the state
            curr = GeneralUtil.getNextMonth(curr);
            balance += gainingPerMonth;
        }
        return schedules;
    }



    public static FdUpsertDTO fromEntity(FixedDeposit fd) {
        FdUpsertDTO dto = new FdUpsertDTO();
        dto.setId(fd.getId());
        dto.setName(fd.getName());
        dto.setRegisteredDate(fd.getRegistration().getRegisteredDate());
        dto.setBank(fd.getRegistration().getBank());
        dto.setCertificateNo(fd.getRegistration().getCertificateNo());
        dto.setReferenceNo(fd.getRegistration().getReferenceNo());
        dto.setComment(fd.getComment());
        dto.setStartDate(fd.getStartDate());
        dto.setPeriod(fd.getPeriod());
        dto.setInitialAmount(fd.getPrincipalAmount());
        dto.setInterestRate(fd.getInterestRate());
        dto.setStatus(fd.getStatus());
        return dto;
    }


}
