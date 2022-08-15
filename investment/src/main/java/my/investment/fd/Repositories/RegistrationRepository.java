package my.investment.fd.Repositories;


import org.springframework.data.repository.CrudRepository;
import my.investment.fd.Entities.Registration;

public interface RegistrationRepository extends CrudRepository<Registration, Long> {}