package my.investment.fd.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import my.investment.fd.Entities.User;
import my.investment.fd.Repositories.UserRepository;



public class InvestUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = userRepository.findByUsername(username);
        if (u == null) throw new UsernameNotFoundException("User not found");
        return new InvestUserDetails(u);
    }
    
}
