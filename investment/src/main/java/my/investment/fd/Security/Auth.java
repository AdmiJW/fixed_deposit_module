package my.investment.fd.Security;

import java.util.Arrays;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
// import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import my.investment.fd.Classes.Role;
import my.investment.fd.Entities.User;
import my.investment.fd.Repositories.UserRepository;

// ! ============================================
// ! Not used now - Migration to Spring Security
// ! ============================================

// A bean with methods to help with authentication
// @Component
public class Auth {

    @Autowired
    private UserRepository userRepository;
    
    public void checkAuthentication( HttpSession session ) throws ResponseStatusException {
        if ( session.getAttribute("userId") == null )
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not logged in. Please log in first");
        
        if ( !userRepository.existsById( (Long)session.getAttribute("userId") ) ) {
            session.invalidate();
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid session. Please log in again");
        }
    }


    // Assumes you had already use checkAuthentication before calling this method
    public void checkAuthorization( Role role, HttpSession session ) throws ResponseStatusException {
        User user = userRepository.findById( (Long)session.getAttribute("userId") ).get();
        if ( user.getRole() != role )
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to view this page");
    }

    public void checkAuthorization( Role[] roles, HttpSession session ) throws ResponseStatusException {
        User user = userRepository.findById( (Long)session.getAttribute("userId") ).get();
        if ( !Arrays.stream(roles).anyMatch(x -> x == user.getRole() ) )
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to view this page");
    }

    // Assumes you had already use checkAuthentication before calling this method
    public User retrieveUser( HttpSession session ) {
        checkAuthentication(session);
        return userRepository.findById( (Long)session.getAttribute("userId") ).get();
    }

}
