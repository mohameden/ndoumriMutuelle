package mr.ndoumri.mutuelle.service;

import mr.ndoumri.mutuelle.service.dto.CotizDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Cotiz.
 */
public interface CotizService {

    /**
     * Save a cotiz.
     *
     * @param cotizDTO the entity to save
     * @return the persisted entity
     */
    CotizDTO save(CotizDTO cotizDTO);

    /**
     * Get all the cotizs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CotizDTO> findAll(Pageable pageable);

    /**
     * Get the "id" cotiz.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CotizDTO findOne(Long id);

    /**
     * Delete the "id" cotiz.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
