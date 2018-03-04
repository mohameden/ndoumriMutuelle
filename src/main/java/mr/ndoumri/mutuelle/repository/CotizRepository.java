package mr.ndoumri.mutuelle.repository;

import mr.ndoumri.mutuelle.domain.Cotiz;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Cotiz entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CotizRepository extends JpaRepository<Cotiz, Long> {

}
