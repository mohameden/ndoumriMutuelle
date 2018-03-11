package mr.ndoumri.mutuelle.repository;

import mr.ndoumri.mutuelle.domain.Engagement;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Engagement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EngagementRepository extends JpaRepository<Engagement, Long> {

    @Query("select engagement from Engagement engagement where engagement.owner.login = ?#{principal.username}")
    List<Engagement> findByOwnerIsCurrentUser();

}
