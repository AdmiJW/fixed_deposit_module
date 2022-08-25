package my.investment.fd.Security;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.server.ResponseStatusException;

import my.investment.fd.Entities.User;
import my.investment.fd.Repositories.UserRepository;
import my.investment.fd.Security.BruteForce.IPBlockedException;
import my.investment.fd.Security.BruteForce.LoginAttemptService;



public class InvestUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoginAttemptService loginAttemptService;

    @Autowired 
    private HttpServletRequest request;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String ip = getClientIP();
        if (loginAttemptService.isBlocked(ip)) throw new IPBlockedException("The IP is blocked for 1 hour");

        User u = userRepository.findByUsername(username);
        if (u == null) throw new UsernameNotFoundException("User not found");
        return new InvestUserDetails(u);
    }


    private String getClientIP() {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null){
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
    
}
