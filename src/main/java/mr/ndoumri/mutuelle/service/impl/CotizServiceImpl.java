package mr.ndoumri.mutuelle.service.impl;

import mr.ndoumri.mutuelle.service.CotizService;
import mr.ndoumri.mutuelle.domain.Cotiz;
import mr.ndoumri.mutuelle.repository.CotizRepository;
import mr.ndoumri.mutuelle.service.dto.CotizDTO;
import mr.ndoumri.mutuelle.service.mapper.CotizMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Cotiz.
 */
@Service
@Transactional
public class CotizServiceImpl implements CotizService {

    private final Logger log = LoggerFactory.getLogger(CotizServiceImpl.class);

    private final CotizRepository cotizRepository;

    private final CotizMapper cotizMapper;

    public CotizServiceImpl(CotizRepository cotizRepository, CotizMapper cotizMapper) {
        this.cotizRepository = cotizRepository;
        this.cotizMapper = cotizMapper;
    }

    /**
     * Save a cotiz.
     *
     * @param cotizDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CotizDTO save(CotizDTO cotizDTO) {
        log.debug("Request to save Cotiz : {}", cotizDTO);
        Cotiz cotiz = cotizMapper.toEntity(cotizDTO);
        cotiz = cotizRepository.save(cotiz);
        return cotizMapper.toDto(cotiz);
    }

    /**
     * Get all the cotizs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CotizDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Cotizs");
        return cotizRepository.findAll(pageable)
            .map(cotizMapper::toDto);
    }

    /**
     * Get one cotiz by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CotizDTO findOne(Long id) {
        log.debug("Request to get Cotiz : {}", id);
        Cotiz cotiz = cotizRepository.findOne(id);
        return cotizMapper.toDto(cotiz);
    }

    /**
     * Delete the cotiz by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cotiz : {}", id);
        cotizRepository.delete(id);
    }
}
