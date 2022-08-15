package my.investment.fd.Classes;

import lombok.Getter;

@Getter
public enum FdStatus {
    NEW("NEW"),
    APPROVED("APPROVED"),
    REJECT("REJECT"),
    DELETED("DELETED");

    private String value;

    private FdStatus(String value) {
        this.value = value;
    }
}
