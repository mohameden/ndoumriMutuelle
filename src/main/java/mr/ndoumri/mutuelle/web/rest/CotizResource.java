package mr.ndoumri.mutuelle.web.rest;

import com.codahale.metrics.annotation.Timed;
import mr.ndoumri.mutuelle.service.CotizService;
import mr.ndoumri.mutuelle.web.rest.errors.BadRequestAlertException;
import mr.ndoumri.mutuelle.web.rest.util.HeaderUtil;
import mr.ndoumri.mutuelle.web.rest.util.PaginationUtil;
import mr.ndoumri.mutuelle.service.dto.CotizDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Cotiz.
 */
@RestController
@RequestMapping("/api")
public class CotizResource {

    private final Logger log = LoggerFactory.getLogger(CotizResource.class);

    private static final String ENTITY_NAME = "cotiz";

    private final CotizService cotizService;

    public CotizResource(CotizService cotizService) {
        this.cotizService = cotizService;
    }

    /**
     * POST  /cotizs : Create a new cotiz.
     *
     * @param cotizDTO the cotizDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cotizDTO, or with status 400 (Bad Request) if the cotiz has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cotizs")
    @Timed
    public ResponseEntity<CotizDTO> createCotiz(@RequestBody CotizDTO cotizDTO) throws URISyntaxException {
        log.debug("REST request to save Cotiz : {}", cotizDTO);
        if (cotizDTO.getId() != null) {
            throw new BadRequestAlertException("A new cotiz cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CotizDTO result = cotizService.save(cotizDTO);
        return ResponseEntity.created(new URI("/api/cotizs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cotizs : Updates an existing cotiz.
     *
     * @param cotizDTO the cotizDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cotizDTO,
     * or with status 400 (Bad Request) if the cotizDTO is not valid,
     * or with status 500 (Internal Server Error) if the cotizDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cotizs")
    @Timed
    public ResponseEntity<CotizDTO> updateCotiz(@RequestBody CotizDTO cotizDTO) throws URISyntaxException {
        log.debug("REST request to update Cotiz : {}", cotizDTO);
        if (cotizDTO.getId() == null) {
            return createCotiz(cotizDTO);
        }
        CotizDTO result = cotizService.save(cotizDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cotizDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cotizs : get all the cotizs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cotizs in body
     */
    @GetMapping("/cotizs")
    @Timed
    public ResponseEntity<List<CotizDTO>> getAllCotizs(Pageable pageable) {
        log.debug("REST request to get a page of Cotizs");
        Page<CotizDTO> page = cotizService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cotizs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /cotizs/:id : get the "id" cotiz.
     *
     * @param id the id of the cotizDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cotizDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cotizs/{id}")
    @Timed
    public ResponseEntity<CotizDTO> getCotiz(@PathVariable Long id) {
        log.debug("REST request to get Cotiz : {}", id);
        CotizDTO cotizDTO = cotizService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cotizDTO));
    }

    /**
     * DELETE  /cotizs/:id : delete the "id" cotiz.
     *
     * @param id the id of the cotizDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cotizs/{id}")
    @Timed
    public ResponseEntity<Void> deleteCotiz(@PathVariable Long id) {
        log.debug("REST request to delete Cotiz : {}", id);
        cotizService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
