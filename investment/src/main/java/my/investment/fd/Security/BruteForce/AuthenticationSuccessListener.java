package my.investment.fd.Security.BruteForce;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationSuccessListener implements 
  ApplicationListener<AuthenticationSuccessEvent> {
    
    @Autowired
    private HttpServletRequest request;

    @Autowired
    private LoginAttemptService loginAttemptService;

    @Override
    public void onApplicationEvent(final AuthenticationSuccessEvent e) {
        final String xfHeader = request.getHeader("X-Forwarded-For");
        String ip = xfHeader == null ? request.getRemoteAddr() : xfHeader.split(",")[0];
        System.out.println("Login success: " + ip);
        loginAttemptService.loginSucceeded( ip );
    }
}
