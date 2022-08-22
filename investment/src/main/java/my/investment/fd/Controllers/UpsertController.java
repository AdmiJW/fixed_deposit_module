package my.investment.fd.Controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.server.ResponseStatusException;

import my.investment.fd.DTO.FdAdditionWithdrawalDTO;
import my.investment.fd.DTO.FdUpsertDTO;
import my.investment.fd.Classes.FdStatus;
import my.investment.fd.Classes.Role;
import my.investment.fd.Entities.Addition;
import my.investment.fd.Entities.FixedDeposit;
import my.investment.fd.Entities.Registration;
import my.investment.fd.Entities.Schedule;
import my.investment.fd.Entities.User;
import my.investment.fd.Entities.Withdrawal;
import my.investment.fd.Logic.AccountingUtil;
import my.investment.fd.Logic.GeneralUtil;
import my.investment.fd.Repositories.FixedDepositRepository;
import my.investment.fd.Repositories.ScheduleRepository;
import my.investment.fd.Security.Auth;
import my.investment.fd.Security.AuthUtil;




@Controller
@RequestMapping(path="/upsert")
@CrossOrigin
public class UpsertController {

    // Repository Dependency Injection
    @Autowired
    private FixedDepositRepository fixedDepositRepository;
    @Autowired
    private ScheduleRepository scheduleRepository;


    //===============================
    // Controller methods
    //===============================
    @PostMapping("")
    @Secured({ Role.Code.ROLE_USER, Role.Code.ROLE_ADMIN })
    public ResponseEntity<Object> insertOneFixedDepositRoute(
        @RequestBody FdUpsertDTO dto
    ) {
        Object res = upsertFixedDeposit(dto, AuthUtil.getCurrentUser() );
        return ResponseEntity.ok(res);
    }


    @PostMapping("/many")
    @Secured({ Role.Code.ROLE_USER, Role.Code.ROLE_ADMIN })
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<Object> insertManyFixedDepositRoute(
        @RequestBody List<FdUpsertDTO> dtos,
        HttpSession session
    ) {
        List<Object> res = new ArrayList<>( dtos.size() );
        User user = AuthUtil.getCurrentUser();
        for (FdUpsertDTO dto : dtos) res.add( upsertFixedDeposit(dto, user ) );
        return ResponseEntity.ok(res);
    }


    @PostMapping("/approve/{id}")
    @Secured({ Role.Code.ROLE_ADMIN })
    public ResponseEntity<Object> approveFixedDepositRoute(
        @PathVariable("id") Long id
    ) {
        FixedDeposit fd = fixedDepositRepository.findById(id).orElse(null);
        if (fd == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Non-existent Fixed Deposit ID: " + id);
        if (fd.getStatus() != FdStatus.NEW) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot approve Fixed Deposit ID: " + id + ". It is not in NEW status");
        fd.setStatus(FdStatus.APPROVED);
        return ResponseEntity.ok( fixedDepositRepository.save(fd) );
    }


    @PostMapping("/reject/{id}")
    @Secured({ Role.Code.ROLE_ADMIN })
    public ResponseEntity<Object> rejectFixedDepositRoute(
        @PathVariable("id") Long id
    ) {
        FixedDeposit fd = fixedDepositRepository.findById(id).orElse(null);
        if (fd == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Non-existent Fixed Deposit ID: " + id);
        if (fd.getStatus() != FdStatus.NEW) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot reject Fixed Deposit ID: " + id + ". It is not in NEW status");
        fd.setStatus(FdStatus.REJECT);
        return ResponseEntity.ok( fixedDepositRepository.save(fd) );
    }

    
    @PostMapping("/addition")
    @Secured({ Role.Code.ROLE_USER })
    public ResponseEntity<Object> insertOneAdditionRoute(
        @RequestBody FdAdditionWithdrawalDTO dto
    ) {
        FixedDeposit fd = fixedDepositRepository.findById(dto.getFixedDepositId()).orElse(null);
        if (fd == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Non-existent Fixed Deposit ID: " + dto.getFixedDepositId());
        if (fd.getStatus() != FdStatus.APPROVED) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You can only make additions to APPROVED fixed deposits");
        if (dto.getAmount() <= 0) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Amount must be greater than 0");
        
        Addition addition = new Addition();
        addition.setAmount(dto.getAmount());
        addition.setFixedDeposit(fd);
        fd.getAdditions().add(addition);
        
        recalculateSchedules(fd);
        fd.setPrincipalAmount( fd.calculatePrincipalAmount() );
        fd.setInterestAmount( fd.calculateInterestAmount() );
        fd.setTotalAddition( fd.calculateTotalAddition() );
        return ResponseEntity.ok( fixedDepositRepository.save(fd) );
    }


    @PostMapping("/withdrawal")
    @Secured({ Role.Code.ROLE_USER })
    public ResponseEntity<Object> insertOneWithdrawalRoute(
        @RequestBody FdAdditionWithdrawalDTO dto
    ) {
        FixedDeposit fd = fixedDepositRepository.findById(dto.getFixedDepositId()).orElse(null);

        if (fd == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Non-existent Fixed Deposit ID: " + dto.getFixedDepositId());
        if (fd.getStatus() != FdStatus.APPROVED) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You can only make withdrawals to APPROVED fixed deposits");
        if (dto.getAmount() <= 0) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Amount must be greater than 0");
        if (fd.getPrincipalAmount() - dto.getAmount() < 0) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot withdraw more than the principal amount");
        
        Withdrawal withdrawal = new Withdrawal();
        withdrawal.setAmount(dto.getAmount());
        withdrawal.setFixedDeposit(fd);
        fd.getWithdrawals().add(withdrawal);

        recalculateSchedules(fd);
        fd.setPrincipalAmount( fd.calculatePrincipalAmount() );
        fd.setInterestAmount( fd.calculateInterestAmount() );
        fd.setTotalWithdrawal( fd.calculateTotalWithdrawal() );
        return ResponseEntity.ok( fixedDepositRepository.save(fd) );
    }



    //===============================
    // Helper methods
    //===============================
    // Insert/Update Fixed Deposit
    //-----------------------------
    // 0. Preliminary actions (Check if it is updating or new record)
    //      0.1 Check if the fixed deposit exists when ID is provided
    //      0.2 If it does, check if the status is not "NEW"
    //      0.3 Drop schedules if existing fixed deposit is being updated
    // 1a. Set registrating user
    // 1b. Pass DTO to create/update FixedDeposit
    // 2. Pass DTO to create/update Registration
    // 3. Generate Schedules based on DTO
    // 4. Connect pieces together
    // 5. Save to database
    private Object upsertFixedDeposit(FdUpsertDTO dto, User user) {
        FixedDeposit fd = new FixedDeposit();
        Registration reg = new Registration();

        // 0. Preliminary actions (Check if it is updating or new record)
        if (dto.getId() != null) {
            // 0.1 Check if the fixed deposit exists when ID is provided
            fd = fixedDepositRepository.findById(dto.getId()).orElse(null);
            if (fd == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Non-existent Fixed Deposit ID: " + dto.getId());
            // 0.2 If it does, check if the status is not "NEW"
            if (fd.getStatus() != FdStatus.NEW) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot edit Fixed Deposit ID: " + dto.getId() + ". It is not in NEW status");
            // 0.3 Drop schedules if existing fixed deposit is being updated
            scheduleRepository.deleteByFixedDeposit(fd);

            reg = fd.getRegistration();
        }

        // 1a. Set registrating user
        fd.setUser(user);
        // 1b. Pass DTO to create/update FixedDeposit
        dto.updateToFixedDeposit(fd);
        // 2. Pass DTO to create/update Registration
        dto.updateToRegistration(reg);
        // 3. Generate Schedules based on DTO
        List<Schedule> schedules = dto.generateSchedules();
        // 4. Connect pieces together
        fd.setRegistration(reg);
        reg.setFixedDeposit(fd);
        fd.setSchedules(schedules);
        for (Schedule s : schedules) s.setFixedDeposit(fd);
        // 5. Save to database
        fd = fixedDepositRepository.save(fd);
        return FdUpsertDTO.fromEntity(fd);
    }


    //-----------------------------------------------------
    // Take initial amount, nett up additions and withdrawals, and recalculate schedules
    // Called when any addition and withdrawal are added to the fixed deposit - principal amount change
    // means schedule has to be updated
    private void recalculateSchedules(FixedDeposit fd) {
        Double principal = fd.calculatePrincipalAmount();
        Double interestRate = fd.getRegistration().getInterestRate();
        LocalDate curr = fd.getStartDate();
        Double gainingPerMonth = AccountingUtil.calculateInterestAmount(principal, interestRate, 1);
        
        for (Schedule s: fd.getSchedules()) {
            s.setDateStart(curr);
            s.setDateEnd( GeneralUtil.getNextMonth(curr) );
            s.setAmountStart(principal);
            s.setAmountEnd( principal + gainingPerMonth );

            // Carry over the state
            curr = GeneralUtil.getNextMonth(curr);
            principal += gainingPerMonth;
        }
    }
}