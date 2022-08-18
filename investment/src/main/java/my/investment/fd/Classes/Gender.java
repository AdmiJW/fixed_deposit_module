package my.investment.fd.Classes;

import lombok.Getter;

@Getter
public enum Gender {
    MALE("M"),
    FEMALE("F");

    private String value;

    private Gender(String value) {
        this.value = value;
    }
}
