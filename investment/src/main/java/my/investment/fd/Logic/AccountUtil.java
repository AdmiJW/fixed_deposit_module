package my.investment.fd.Logic;



public class AccountUtil {
    // Calculate the estimate interest amount for a fixed deposit
    // Assumption: The interest rate is annualized, in percentage (value of 10 means 10%)
    //              The period is in months
    public static Double calculateInterestAmount(Double principalAmount, Double interestRate, Integer period) {
        return principalAmount * (interestRate / 100.0) * (period / 12.0);
    }
}
