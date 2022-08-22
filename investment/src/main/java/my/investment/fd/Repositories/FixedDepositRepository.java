package my.investment.fd.Repositories;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import my.investment.fd.Classes.FdStatus;
import my.investment.fd.DTO.FdListDTO;
import my.investment.fd.DTO.FdUpsertDTO;
import my.investment.fd.Entities.FixedDeposit;
import my.investment.fd.Entities.User;

public interface FixedDepositRepository extends JpaRepository<FixedDeposit, Long> {

    // Unfiltered
    default List<FdListDTO> findAllAsFdListDTO() {
        return findAll().stream().map(FdListDTO::fromEntity).collect(Collectors.toList());
    }

    default Page<FdListDTO> findAllAsFdListDTO(Pageable pageable) {
        return findAll(pageable).map(FdListDTO::fromEntity);
    }

    default List<FdUpsertDTO> findAllAsFdUpsertDTO() {
        return findAll().stream().map(FdUpsertDTO::fromEntity).collect(Collectors.toList());
    }

    
    // Filter by ID
    default FdUpsertDTO findByIdAsFdUpsertDTO(Long id) {
        FixedDeposit fd = findById(id).orElse(null);
        if (fd == null) return null;
        return FdUpsertDTO.fromEntity(fd);
    }


    // Filter By status and user
    @Query("select f FROM FixedDeposit f WHERE (?1 is null or f.status = ?1) and (?2 is null or f.user = ?2)")
    Page<FixedDeposit> findAllByStatusAndUser(FdStatus status, User user, Pageable pageable);

    default Page<FdListDTO> findAllByStatusAndUserAsFdListDTO(FdStatus status, User user, Pageable pageable) {
        return findAllByStatusAndUser(status, user, pageable).map(FdListDTO::fromEntity);
    }
}