package mr.ndoumri.mutuelle.web.rest;

import mr.ndoumri.mutuelle.NdoumriMutuelleApp;

import mr.ndoumri.mutuelle.domain.Engagement;
import mr.ndoumri.mutuelle.repository.EngagementRepository;
import mr.ndoumri.mutuelle.service.EngagementService;
import mr.ndoumri.mutuelle.service.dto.EngagementDTO;
import mr.ndoumri.mutuelle.service.mapper.EngagementMapper;
import mr.ndoumri.mutuelle.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static mr.ndoumri.mutuelle.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EngagementResource REST controller.
 *
 * @see EngagementResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NdoumriMutuelleApp.class)
public class EngagementResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_EXPECTED_AMOUNT = 1D;
    private static final Double UPDATED_EXPECTED_AMOUNT = 2D;

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    @Autowired
    private EngagementRepository engagementRepository;

    @Autowired
    private EngagementMapper engagementMapper;

    @Autowired
    private EngagementService engagementService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEngagementMockMvc;

    private Engagement engagement;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EngagementResource engagementResource = new EngagementResource(engagementService);
        this.restEngagementMockMvc = MockMvcBuilders.standaloneSetup(engagementResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Engagement createEntity(EntityManager em) {
        Engagement engagement = new Engagement()
            .name(DEFAULT_NAME)
            .expectedAmount(DEFAULT_EXPECTED_AMOUNT)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .comment(DEFAULT_COMMENT);
        return engagement;
    }

    @Before
    public void initTest() {
        engagement = createEntity(em);
    }

    @Test
    @Transactional
    public void createEngagement() throws Exception {
        int databaseSizeBeforeCreate = engagementRepository.findAll().size();

        // Create the Engagement
        EngagementDTO engagementDTO = engagementMapper.toDto(engagement);
        restEngagementMockMvc.perform(post("/api/engagements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(engagementDTO)))
            .andExpect(status().isCreated());

        // Validate the Engagement in the database
        List<Engagement> engagementList = engagementRepository.findAll();
        assertThat(engagementList).hasSize(databaseSizeBeforeCreate + 1);
        Engagement testEngagement = engagementList.get(engagementList.size() - 1);
        assertThat(testEngagement.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEngagement.getExpectedAmount()).isEqualTo(DEFAULT_EXPECTED_AMOUNT);
        assertThat(testEngagement.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testEngagement.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testEngagement.getComment()).isEqualTo(DEFAULT_COMMENT);
    }

    @Test
    @Transactional
    public void createEngagementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = engagementRepository.findAll().size();

        // Create the Engagement with an existing ID
        engagement.setId(1L);
        EngagementDTO engagementDTO = engagementMapper.toDto(engagement);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEngagementMockMvc.perform(post("/api/engagements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(engagementDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Engagement in the database
        List<Engagement> engagementList = engagementRepository.findAll();
        assertThat(engagementList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEngagements() throws Exception {
        // Initialize the database
        engagementRepository.saveAndFlush(engagement);

        // Get all the engagementList
        restEngagementMockMvc.perform(get("/api/engagements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(engagement.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].expectedAmount").value(hasItem(DEFAULT_EXPECTED_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())));
    }

    @Test
    @Transactional
    public void getEngagement() throws Exception {
        // Initialize the database
        engagementRepository.saveAndFlush(engagement);

        // Get the engagement
        restEngagementMockMvc.perform(get("/api/engagements/{id}", engagement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(engagement.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.expectedAmount").value(DEFAULT_EXPECTED_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEngagement() throws Exception {
        // Get the engagement
        restEngagementMockMvc.perform(get("/api/engagements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEngagement() throws Exception {
        // Initialize the database
        engagementRepository.saveAndFlush(engagement);
        int databaseSizeBeforeUpdate = engagementRepository.findAll().size();

        // Update the engagement
        Engagement updatedEngagement = engagementRepository.findOne(engagement.getId());
        // Disconnect from session so that the updates on updatedEngagement are not directly saved in db
        em.detach(updatedEngagement);
        updatedEngagement
            .name(UPDATED_NAME)
            .expectedAmount(UPDATED_EXPECTED_AMOUNT)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .comment(UPDATED_COMMENT);
        EngagementDTO engagementDTO = engagementMapper.toDto(updatedEngagement);

        restEngagementMockMvc.perform(put("/api/engagements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(engagementDTO)))
            .andExpect(status().isOk());

        // Validate the Engagement in the database
        List<Engagement> engagementList = engagementRepository.findAll();
        assertThat(engagementList).hasSize(databaseSizeBeforeUpdate);
        Engagement testEngagement = engagementList.get(engagementList.size() - 1);
        assertThat(testEngagement.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEngagement.getExpectedAmount()).isEqualTo(UPDATED_EXPECTED_AMOUNT);
        assertThat(testEngagement.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testEngagement.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testEngagement.getComment()).isEqualTo(UPDATED_COMMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingEngagement() throws Exception {
        int databaseSizeBeforeUpdate = engagementRepository.findAll().size();

        // Create the Engagement
        EngagementDTO engagementDTO = engagementMapper.toDto(engagement);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEngagementMockMvc.perform(put("/api/engagements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(engagementDTO)))
            .andExpect(status().isCreated());

        // Validate the Engagement in the database
        List<Engagement> engagementList = engagementRepository.findAll();
        assertThat(engagementList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEngagement() throws Exception {
        // Initialize the database
        engagementRepository.saveAndFlush(engagement);
        int databaseSizeBeforeDelete = engagementRepository.findAll().size();

        // Get the engagement
        restEngagementMockMvc.perform(delete("/api/engagements/{id}", engagement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Engagement> engagementList = engagementRepository.findAll();
        assertThat(engagementList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Engagement.class);
        Engagement engagement1 = new Engagement();
        engagement1.setId(1L);
        Engagement engagement2 = new Engagement();
        engagement2.setId(engagement1.getId());
        assertThat(engagement1).isEqualTo(engagement2);
        engagement2.setId(2L);
        assertThat(engagement1).isNotEqualTo(engagement2);
        engagement1.setId(null);
        assertThat(engagement1).isNotEqualTo(engagement2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EngagementDTO.class);
        EngagementDTO engagementDTO1 = new EngagementDTO();
        engagementDTO1.setId(1L);
        EngagementDTO engagementDTO2 = new EngagementDTO();
        assertThat(engagementDTO1).isNotEqualTo(engagementDTO2);
        engagementDTO2.setId(engagementDTO1.getId());
        assertThat(engagementDTO1).isEqualTo(engagementDTO2);
        engagementDTO2.setId(2L);
        assertThat(engagementDTO1).isNotEqualTo(engagementDTO2);
        engagementDTO1.setId(null);
        assertThat(engagementDTO1).isNotEqualTo(engagementDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(engagementMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(engagementMapper.fromId(null)).isNull();
    }
}
