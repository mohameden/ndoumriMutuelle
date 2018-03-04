package mr.ndoumri.mutuelle.service.impl;

import mr.ndoumri.mutuelle.service.EngagementService;
import mr.ndoumri.mutuelle.domain.Engagement;
import mr.ndoumri.mutuelle.repository.EngagementRepository;
import mr.ndoumri.mutuelle.service.dto.EngagementDTO;
import mr.ndoumri.mutuelle.service.mapper.EngagementMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Engagement.
 */
@Service
@Transactional
public class EngagementServiceImpl implements EngagementService {

    private final Logger log = LoggerFactory.getLogger(EngagementServiceImpl.class);

    private final EngagementRepository engagementRepository;

    private final EngagementMapper engagementMapper;

    public EngagementServiceImpl(EngagementRepository engagementRepository, EngagementMapper engagementMapper) {
        this.engagementRepository = engagementRepository;
        this.engagementMapper = engagementMapper;
    }

    /**
     * Save a engagement.
     *
     * @param engagementDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EngagementDTO save(EngagementDTO engagementDTO) {
        log.debug("Request to save Engagement : {}", engagementDTO);
        Engagement engagement = engagementMapper.toEntity(engagementDTO);
        engagement = engagementRepository.save(engagement);
        return engagementMapper.toDto(engagement);
    }

    /**
     * Get all the engagements.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<EngagementDTO> findAll() {
        log.debug("Request to get all Engagements");
        return engagementRepository.findAll().stream()
            .map(engagementMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one engagement by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EngagementDTO findOne(Long id) {
        log.debug("Request to get Engagement : {}", id);
        Engagement engagement = engagementRepository.findOne(id);
        return engagementMapper.toDto(engagement);
    }

    /**
     * Delete the engagement by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Engagement : {}", id);
        engagementRepository.delete(id);
    }
}
