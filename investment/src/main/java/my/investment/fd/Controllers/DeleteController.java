package my.investment.fd.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.server.ResponseStatusException;

import my.investment.fd.Classes.Role;
import my.investment.fd.Entities.FixedDeposit;
import my.investment.fd.Repositories.FixedDepositRepository;




@Controller
@RequestMapping(path="/delete")
@CrossOrigin
public class DeleteController {

    // Repository Dependency Injection
    @Autowired
    private FixedDepositRepository fixedDepositRepository;


    //===============================
    // Controller methods
    //===============================
    @DeleteMapping("/{id}")
    @Secured({ Role.Code.ROLE_ADMIN, Role.Code.ROLE_USER })
    public ResponseEntity<Object> deleteOneFixedDepositRoute(
        @PathVariable("id") Long id
    ) {
        FixedDeposit fd = fixedDepositRepository.findById(id).orElse(null);
        if (fd == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Non-existent Fixed Deposit ID: " + id);
        fixedDepositRepository.delete(fd);
        return ResponseEntity.ok(fd);
    }
}