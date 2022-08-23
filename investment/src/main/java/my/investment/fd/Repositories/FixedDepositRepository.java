package my.investment.fd.Repositories;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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


    // Filter By status, user, name, registrant's name
    // Note that this is JPA query, which % is undefined. We need to concat the % ourselves
    @Query("SELECT f FROM FixedDeposit f WHERE " + 
    "(:status IS NULL or f.status = :status) AND " +
    "(:user IS NULL or f.user = :user) AND " +
    "(:fdname IS NULL or f.name LIKE CONCAT('%', :fdname, '%')) AND " +
    "(:regname IS NULL or f.user.name LIKE CONCAT('%', :regname, '%'))")
    Page<FixedDeposit> findAll(
        @Param("status") FdStatus status, 
        @Param("user") User user, 
        @Param("fdname") String fixedDepositName, 
        @Param("regname") String registrantName, 
        Pageable pageable
    );

    default Page<FdListDTO> findAllAsFdListDTO(FdStatus status, User user, String fixedDepositName, String registrantName, Pageable pageable) {
        return findAll(status, user, fixedDepositName, registrantName, pageable).map(FdListDTO::fromEntity);
    }
}