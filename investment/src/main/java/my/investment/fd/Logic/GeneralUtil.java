package my.investment.fd.Logic;

import java.time.LocalDate;


public class GeneralUtil {
    
    // Returns the date of the last day of current month from provided date
    public static LocalDate getEndOfMonth(LocalDate date) {
        // Get first day of next month, then subtract 1 day.
        return getFirstDayOfNextMonth(date).plusDays(-1);
    }


    // Returns the date of the first day of next month from provided date
    public static LocalDate getFirstDayOfNextMonth(LocalDate date) {
        // Increment to next month, then set day to 1st
        date = date.plusMonths(1);
        return LocalDate.of(date.getYear(), date.getMonth(), 1);
    }


    // This function assumes a month is 30 days, as per theory of fixed deposit
    public static LocalDate getNextMonth(LocalDate date) {
        return date.plusDays(30);
    }


    // Calculates the end date of the fixed deposit given start date and period (months)
    public static LocalDate getEndDate(LocalDate startDate, int period) {
        return startDate.plusDays(30 * period);
    }
}
