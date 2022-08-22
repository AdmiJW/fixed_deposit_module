package my.investment.fd.Security;

import org.springframework.security.core.context.SecurityContextHolder;

import my.investment.fd.Classes.Role;
import my.investment.fd.Entities.FixedDeposit;
import my.investment.fd.Entities.User;

public class AuthUtil {
    /**
    * Returns the domain User object for the currently logged in user, or null
    * if no User is logged in.
    * 
    * @return User object for the currently logged in user, or null if no User
    *         is logged in.
    */
    public static User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof InvestUserDetails) return ((InvestUserDetails) principal).getUser();

        // principal object is either null or represents anonymous user -
        // neither of which our domain User object can represent - so return null
        return null;
    }


    /**
     * Utility method to determine if the current user is logged in /
     * authenticated.
     * 
     * @return if user is logged in
     */
    public static boolean isLoggedIn() {
        return getCurrentUser() != null;
    }


    /**
     * Check if current user has ADMIN authority
     * @return if current user is of Role.ROLE_ADMIN
     */
    public static boolean isAdmin(User user) {
        return (user != null && user.getRole() == Role.ROLE_ADMIN);
    }


    /**
     * Check if current user has authority to perform CRUD operation on provided FD.
     * A user has permission if:
     *      1. User is ADMIN
     *      2. User is owner of FD
     */
    public static boolean hasCRUDPermission(FixedDeposit fd) {
        User user = getCurrentUser();
        if (user == null) return false;

        return ( isAdmin(user) || fd.getUser().getId().equals( user.getId() ) );
    }
}
