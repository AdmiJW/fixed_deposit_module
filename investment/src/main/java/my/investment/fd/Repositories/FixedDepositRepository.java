package my.investment.fd.Repositories;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import my.investment.fd.Classes.FdStatus;
import my.investment.fd.DTO.FdListDTO;
import my.investment.fd.DTO.FdUpsertDTO;
import my.investment.fd.Entities.FixedDeposit;

public interface FixedDepositRepository extends JpaRepository<FixedDeposit, Long> {
    Page<FixedDeposit> findAllByStatus(FdStatus status, Pageable pageable);

    default Page<FdListDTO> findAllByStatusAsFdListDTO(FdStatus status, Pageable pageable) {
        return findAllByStatus(status, pageable).map(FdListDTO::fromEntity);
    }

    default Page<FdListDTO> findAllAsFdListDTO(Pageable pageable) {
        return findAll(pageable).map(FdListDTO::fromEntity);
    }

    default FdUpsertDTO findByIdAsFdUpsertDTO(Long id) {
        FixedDeposit fd = findById(id).orElse(null);
        if (fd == null) return null;
        return FdUpsertDTO.fromEntity(fd);
    }

}