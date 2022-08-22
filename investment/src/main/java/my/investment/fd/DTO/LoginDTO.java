package my.investment.fd.DTO;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDTO {
    private String username;
    private String password;
    private Boolean rememberMe;

    public Authentication getAuthenticationToken() {
        return new UsernamePasswordAuthenticationToken(username, password);
    }
}
