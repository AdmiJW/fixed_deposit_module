package my.investment.fd.Repositories;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import my.investment.fd.Entities.FixedDeposit;
import my.investment.fd.Entities.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    // @Modifying annotation is required for insert, delete, update queries
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    // User defined repository methods are read only by default. We need to add @Transactional annotation 
    @Transactional
    Long deleteByFixedDeposit(FixedDeposit fd);


    // get by fixed deposit id
    Page<Schedule> findAllByFixedDepositOrderByDateStartAsc(FixedDeposit fd, Pageable pageable);

}