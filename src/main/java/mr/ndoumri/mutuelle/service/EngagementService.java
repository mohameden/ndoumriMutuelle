package mr.ndoumri.mutuelle.service;

import mr.ndoumri.mutuelle.service.dto.EngagementDTO;
import java.util.List;

/**
 * Service Interface for managing Engagement.
 */
public interface EngagementService {

    /**
     * Save a engagement.
     *
     * @param engagementDTO the entity to save
     * @return the persisted entity
     */
    EngagementDTO save(EngagementDTO engagementDTO);

    /**
     * Get all the engagements.
     *
     * @return the list of entities
     */
    List<EngagementDTO> findAll();

    /**
     * Get the "id" engagement.
     *
     * @param id the id of the entity
     * @return the entity
     */
    EngagementDTO findOne(Long id);

    /**
     * Delete the "id" engagement.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
