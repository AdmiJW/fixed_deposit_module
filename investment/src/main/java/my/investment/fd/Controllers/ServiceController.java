package my.investment.fd.Controllers;


import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import my.investment.fd.Logic.AccountUtil;




@Controller
@RequestMapping(path="/service")
@CrossOrigin
public class ServiceController {
    
    @GetMapping("/calculate_interest")
    public ResponseEntity<Object> getFixedDepositRoute(
        @RequestParam(name="principal_amount", required=true) Double principalAmount,
        @RequestParam(name="interest_rate", required=true) Double interestRate,
        @RequestParam(name="period", required=true) Integer period
    ) {
        Map<String, String> response = new HashMap<>();
        response.put("principal_amount", principalAmount.toString());
        response.put("interest_rate", interestRate.toString());
        response.put("period", period.toString());
        response.put("interest", AccountUtil.calculateInterestAmount(principalAmount, interestRate, period).toString());

        return ResponseEntity.ok(response);
    }


}