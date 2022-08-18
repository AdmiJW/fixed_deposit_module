package my.investment.fd.Classes;

import lombok.Getter;

@Getter
public enum Role {
    ADMIN("ROLE_ADMIN"),
    USER("ROLE_USER");

    private String value;

    private Role(String value) {
        this.value = value;
    }
}
