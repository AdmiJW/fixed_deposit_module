package my.investment.fd.Repositories;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import my.investment.fd.Entities.Addition;
import my.investment.fd.Entities.FixedDeposit;
import my.investment.fd.DTO.FdAdditionWithdrawalDTO;

public interface AdditionRepository extends JpaRepository<Addition, Long> {

    Page<Addition> findAllByFixedDeposit(FixedDeposit fixedDeposit, Pageable pg);

    default Page<FdAdditionWithdrawalDTO> findAllByFixedDepositAsFdAdditionWithdrawalDTO(FixedDeposit fd, Pageable pg) {
        return findAllByFixedDeposit(fd, pg).map(FdAdditionWithdrawalDTO::fromEntity);
    }

}