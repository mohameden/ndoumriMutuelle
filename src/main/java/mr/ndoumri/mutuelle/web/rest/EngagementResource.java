package mr.ndoumri.mutuelle.web.rest;

import com.codahale.metrics.annotation.Timed;

import mr.ndoumri.mutuelle.security.AuthoritiesConstants;
import mr.ndoumri.mutuelle.service.EngagementService;
import mr.ndoumri.mutuelle.web.rest.errors.BadRequestAlertException;
import mr.ndoumri.mutuelle.web.rest.util.HeaderUtil;
import mr.ndoumri.mutuelle.service.dto.EngagementDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Engagement.
 */
@RestController
@RequestMapping("/api")
public class EngagementResource {

    private final Logger log = LoggerFactory.getLogger(EngagementResource.class);

    private static final String ENTITY_NAME = "engagement";

    private final EngagementService engagementService;

    public EngagementResource(EngagementService engagementService) {
        this.engagementService = engagementService;
    }

    /**
     * POST  /engagements : Create a new engagement.
     *
     * @param engagementDTO the engagementDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new engagementDTO, or with status 400 (Bad Request) if the engagement has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/engagements")
    @Secured(AuthoritiesConstants.ADMIN)
    @Timed
    public ResponseEntity<EngagementDTO> createEngagement(@RequestBody EngagementDTO engagementDTO) throws URISyntaxException {
        log.debug("REST request to save Engagement : {}", engagementDTO);
        if (engagementDTO.getId() != null) {
            throw new BadRequestAlertException("A new engagement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EngagementDTO result = engagementService.save(engagementDTO);
        return ResponseEntity.created(new URI("/api/engagements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /engagements : Updates an existing engagement.
     *
     * @param engagementDTO the engagementDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated engagementDTO,
     * or with status 400 (Bad Request) if the engagementDTO is not valid,
     * or with status 500 (Internal Server Error) if the engagementDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/engagements")
    @Secured(AuthoritiesConstants.ADMIN)
    @Timed
    public ResponseEntity<EngagementDTO> updateEngagement(@RequestBody EngagementDTO engagementDTO) throws URISyntaxException {
        log.debug("REST request to update Engagement : {}", engagementDTO);
        if (engagementDTO.getId() == null) {
            return createEngagement(engagementDTO);
        }
        EngagementDTO result = engagementService.save(engagementDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, engagementDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /engagements : get all the engagements.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of engagements in body
     */
    @GetMapping("/engagements")
    @Timed
    public List<EngagementDTO> getAllEngagements() {
        log.debug("REST request to get all Engagements");
        return engagementService.findAll();
        }

    /**
     * GET  /engagements/:id : get the "id" engagement.
     *
     * @param id the id of the engagementDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the engagementDTO, or with status 404 (Not Found)
     */
    @GetMapping("/engagements/{id}")
    @Timed
    public ResponseEntity<EngagementDTO> getEngagement(@PathVariable Long id) {
        log.debug("REST request to get Engagement : {}", id);
        EngagementDTO engagementDTO = engagementService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(engagementDTO));
    }

    /**
     * DELETE  /engagements/:id : delete the "id" engagement.
     *
     * @param id the id of the engagementDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/engagements/{id}")
    @Secured(AuthoritiesConstants.ADMIN)
    @Timed
    public ResponseEntity<Void> deleteEngagement(@PathVariable Long id) {
        log.debug("REST request to delete Engagement : {}", id);
        engagementService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
