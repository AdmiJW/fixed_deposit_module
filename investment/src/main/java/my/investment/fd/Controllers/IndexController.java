package my.investment.fd.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import my.investment.fd.DTO.FdUpsertDTO;
import my.investment.fd.Repositories.FixedDepositRepository;


// https://www.baeldung.com/freemarker-in-spring-mvc-tutorial
@Controller
@CrossOrigin
public class IndexController {

    @Autowired
    private FixedDepositRepository fixedDepositRepository;
    
    @GetMapping(path="/")
    public String index(Model model) {
        model.addAttribute("name", "AdmiJW");
        return "index_view";
    }

    @GetMapping(path="/dashboard")
    public String dashboard(Model model) throws JsonProcessingException {
        List<FdUpsertDTO> fd = fixedDepositRepository.findAllAsFdUpsertDTO();

        // Setup Jackson object serializer
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        
        model.addAttribute("data", mapper.writeValueAsString(fd) );
        model.addAttribute("name", "AdmiJW");
        return "dashboard_view";
    }
}
