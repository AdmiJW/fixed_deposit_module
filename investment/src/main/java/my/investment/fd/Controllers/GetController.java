package my.investment.fd.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;

import my.investment.fd.DTO.FdUpsertDTO;
import my.investment.fd.Entities.FixedDeposit;
import my.investment.fd.Entities.User;
import my.investment.fd.Classes.FdStatus;
import my.investment.fd.Classes.Role;
import my.investment.fd.Repositories.AdditionRepository;
import my.investment.fd.Repositories.FixedDepositRepository;
import my.investment.fd.Repositories.ScheduleRepository;
import my.investment.fd.Repositories.WithdrawalRepository;
import my.investment.fd.Security.AuthUtil;




@Controller
@RequestMapping(path="/get")
@CrossOrigin
@Secured({ Role.Code.ROLE_ADMIN, Role.Code.ROLE_USER })
public class GetController {

    // Repository Dependency Injection
    @Autowired
    private FixedDepositRepository fixedDepositRepository;
    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private AdditionRepository additionRepository;
    @Autowired
    private WithdrawalRepository withdrawalRepository;



    //===============================
    // List View Methods
    //===============================
    @GetMapping("/list_view")
    public ResponseEntity<Object> getFixedDepositRoute(
        @RequestParam(name = "page", required = false, defaultValue = "1") Integer page,
        @RequestParam(name = "page_size", required = false, defaultValue = "10") Integer pageSize,
        @RequestParam(name = "fd_name", required = false) String fixedDepositName,
        @RequestParam(name = "registrant_name", required = false) String registrantName,
        @RequestParam(name = "status", required = false) String status
        // If sorting is required, see https://www.baeldung.com/spring-data-jpa-pagination-sorting
    ) {
        // Do not allow negative page and page size
        if (page < 1) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Page must be greater than or equal to 1");
        if (pageSize < 1) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Page size must be greater than or equal to 1");

        // Tries to convert into status
        FdStatus fdStatus = null;
        try {
            if (status != null && !status.isEmpty()) fdStatus = FdStatus.valueOf(status);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid 'status' value: " + status);
        }

        User u = AuthUtil.getCurrentUser();
        Pageable pg = PageRequest.of(page - 1, pageSize ); 

        return ResponseEntity
            .status(HttpStatus.OK)
            .body( 
                AuthUtil.isAdmin(u)?
                fixedDepositRepository.findAll(fdStatus, null, fixedDepositName, registrantName, pg):  // Admin can view all
                fixedDepositRepository.findAll(fdStatus, u, fixedDepositName, registrantName, pg)           // Normal user can see own fd only
            );
    }



    @GetMapping("/upsert_view/{id}")
    public ResponseEntity<Object> getOneFixedDepositRoute(
        @PathVariable("id") Long id
    ) {
        FixedDeposit fd = fixedDepositRepository.findById(id).orElse(null);
        if (fd == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Non-existent Fixed Deposit ID: " + id);
        if ( !AuthUtil.hasCRUDPermission(fd) ) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not have permission to view this Fixed Deposit");
        return ResponseEntity.status(HttpStatus.OK).body( FdUpsertDTO.fromEntity(fd) );
    }



    @GetMapping("/schedule_view/{id}")
    public ResponseEntity<Object> getSchedulesRoute(
        @PathVariable("id") Long id,
        @RequestParam(name = "page", required = false, defaultValue = "1") Integer page,
        @RequestParam(name = "page_size", required = false, defaultValue = "10") Integer pageSize
    ) {
        // Do not allow negative page and page size
        if (page < 1) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Page must be greater than or equal to 1");
        if (pageSize < 1) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Page size must be greater than or equal to 1");

        Pageable pg = PageRequest.of(page - 1, pageSize );

        FixedDeposit fd = fixedDepositRepository.findById(id).orElse(null);
        if (fd == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Non-existent Fixed Deposit ID: " + id);
        if ( !AuthUtil.hasCRUDPermission(fd) ) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not have permission to view this Fixed Deposit");
        return ResponseEntity.status(HttpStatus.OK).body( scheduleRepository.findAllByFixedDepositOrderByDateStartAsc(fd, pg) );
    }



    @GetMapping("/additions/{id}")
    public ResponseEntity<Object> getAdditionsRoute(
        @PathVariable("id") Long id,
        @RequestParam(name = "page", required = false, defaultValue = "1") Integer page
    ) {
        // Do not allow negative page
        if (page < 1) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Page must be greater than or equal to 1");
        
        Pageable pg = PageRequest.of(page - 1, 5 );

        FixedDeposit fd = fixedDepositRepository.findById(id).orElse(null);
        if (fd == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Non-existent Fixed Deposit ID: " + id);
        return ResponseEntity.status(HttpStatus.OK).body( additionRepository.findAllByFixedDepositAsFdAdditionWithdrawalDTO(fd, pg) );
    }


    @GetMapping("/withdrawals/{id}")
    public ResponseEntity<Object> getWithdrawalsRoute(
        @PathVariable("id") Long id,
        @RequestParam(name = "page", required = false, defaultValue = "1") Integer page
    ) {
        // Do not allow negative page
        if (page < 1) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Page must be greater than or equal to 1");
        
        Pageable pg = PageRequest.of(page - 1, 5 );

        FixedDeposit fd = fixedDepositRepository.findById(id).orElse(null);
        if (fd == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Non-existent Fixed Deposit ID: " + id);
        return ResponseEntity.status(HttpStatus.OK).body( withdrawalRepository.findAllByFixedDepositAsFdAdditionWithdrawalDTO(fd, pg) );
    }


}