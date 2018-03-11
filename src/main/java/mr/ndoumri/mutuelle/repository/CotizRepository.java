package mr.ndoumri.mutuelle.repository;

import mr.ndoumri.mutuelle.domain.Cotiz;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Cotiz entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CotizRepository extends JpaRepository<Cotiz, Long> {

    @Query("select cotiz from Cotiz cotiz where cotiz.user.login = ?#{principal.username}")
    List<Cotiz> findByUserIsCurrentUser();

}
