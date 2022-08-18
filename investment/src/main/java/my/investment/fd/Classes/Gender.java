package my.investment.fd.Classes;

import lombok.Getter;

@Getter
public enum Gender {
    M("MALE"),
    F("FEMALE");

    private String value;

    private Gender(String value) {
        this.value = value;
    }
}
