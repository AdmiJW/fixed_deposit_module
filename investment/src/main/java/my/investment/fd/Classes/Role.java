package my.investment.fd.Classes;

import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;

@Getter
public enum Role implements GrantedAuthority {
    ROLE_ADMIN("ROLE_ADMIN"),
    ROLE_USER("ROLE_USER");

    @JsonIgnore
    private final String value;

    private Role(String value) {
        this.value = value;
    }

    @Override
    public String getAuthority() {
        return value;
    }

    public static class Code {
        public static final String ROLE_ADMIN = "ROLE_ADMIN";
        public static final String ROLE_USER = "ROLE_USER";
    }
}
