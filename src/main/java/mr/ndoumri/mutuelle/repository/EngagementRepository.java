package mr.ndoumri.mutuelle.repository;

import mr.ndoumri.mutuelle.domain.Engagement;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Engagement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EngagementRepository extends JpaRepository<Engagement, Long> {

}
