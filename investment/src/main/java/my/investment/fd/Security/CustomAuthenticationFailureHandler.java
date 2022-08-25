package my.investment.fd.Security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;


public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {
    
    // On authentication error, redirects to the specified url with error message in the param
    @Override
    public void onAuthenticationFailure(
        HttpServletRequest request, 
        HttpServletResponse response,
        AuthenticationException exception
    ) throws IOException, ServletException {
        response.sendRedirect("/auth/login_failure?message=" + exception.getMessage() );
    }
}