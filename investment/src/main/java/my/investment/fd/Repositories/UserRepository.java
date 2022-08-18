package my.investment.fd.Repositories;

import org.springframework.data.repository.CrudRepository;

import my.investment.fd.Entities.User;


public interface UserRepository extends CrudRepository<User, Long> {

    public User findByUsername(String username);
    
}