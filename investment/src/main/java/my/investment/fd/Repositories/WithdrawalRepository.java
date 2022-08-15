package my.investment.fd.Repositories;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import my.investment.fd.DTO.FdAdditionWithdrawalDTO;
import my.investment.fd.Entities.FixedDeposit;
import my.investment.fd.Entities.Withdrawal;

public interface WithdrawalRepository extends JpaRepository<Withdrawal, Long> {

    Page<Withdrawal> findAllByFixedDeposit(FixedDeposit fixedDeposit, Pageable pg);

    default Page<FdAdditionWithdrawalDTO> findAllByFixedDepositAsFdAdditionWithdrawalDTO(FixedDeposit fd, Pageable pg) {
        return findAllByFixedDeposit(fd, pg).map(FdAdditionWithdrawalDTO::fromEntity);
    }
}