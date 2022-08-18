package my.investment.fd.Classes;

import lombok.Getter;

@Getter
public enum Role {
    ROLE_ADMIN("ROLE_ADMIN"),
    ROLE_USER("ROLE_USER");

    private String value;

    private Role(String value) {
        this.value = value;
    }
}
