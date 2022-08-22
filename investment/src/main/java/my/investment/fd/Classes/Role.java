package my.investment.fd.Classes;

import org.springframework.security.core.GrantedAuthority;

import lombok.Getter;

@Getter
public enum Role implements GrantedAuthority {
    ROLE_ADMIN("ROLE_ADMIN"),
    ROLE_USER("ROLE_USER");

    private String value;

    private Role(String value) {
        this.value = value;
    }

    @Override
    public String getAuthority() {
        return value;
    }
}
