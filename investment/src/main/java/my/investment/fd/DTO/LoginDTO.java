package my.investment.fd.DTO;

import org.hibernate.query.criteria.internal.predicate.BooleanExpressionPredicate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDTO {
    private String username;
    private String password;
    private Boolean rememberMe;
}
