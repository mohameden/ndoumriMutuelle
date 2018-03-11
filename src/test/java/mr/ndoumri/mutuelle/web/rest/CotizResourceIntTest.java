package mr.ndoumri.mutuelle.web.rest;

import mr.ndoumri.mutuelle.NdoumriMutuelleApp;

import mr.ndoumri.mutuelle.domain.Cotiz;
import mr.ndoumri.mutuelle.repository.CotizRepository;
import mr.ndoumri.mutuelle.service.CotizService;
import mr.ndoumri.mutuelle.service.dto.CotizDTO;
import mr.ndoumri.mutuelle.service.mapper.CotizMapper;
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

import mr.ndoumri.mutuelle.domain.enumeration.PaymentMode;
/**
 * Test class for the CotizResource REST controller.
 *
 * @see CotizResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NdoumriMutuelleApp.class)
public class CotizResourceIntTest {

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;

    private static final String DEFAULT_CURRENCY = "AAAAAAAAAA";
    private static final String UPDATED_CURRENCY = "BBBBBBBBBB";

    private static final Instant DEFAULT_PAYMENT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PAYMENT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DUE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DUE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final PaymentMode DEFAULT_PAYMENT_MODE = PaymentMode.CASH;
    private static final PaymentMode UPDATED_PAYMENT_MODE = PaymentMode.OTHER;

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    @Autowired
    private CotizRepository cotizRepository;

    @Autowired
    private CotizMapper cotizMapper;

    @Autowired
    private CotizService cotizService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCotizMockMvc;

    private Cotiz cotiz;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CotizResource cotizResource = new CotizResource(cotizService);
        this.restCotizMockMvc = MockMvcBuilders.standaloneSetup(cotizResource)
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
    public static Cotiz createEntity(EntityManager em) {
        Cotiz cotiz = new Cotiz()
            .amount(DEFAULT_AMOUNT)
            .currency(DEFAULT_CURRENCY)
            .paymentDate(DEFAULT_PAYMENT_DATE)
            .dueDate(DEFAULT_DUE_DATE)
            .paymentMode(DEFAULT_PAYMENT_MODE)
            .comment(DEFAULT_COMMENT);
        return cotiz;
    }

    @Before
    public void initTest() {
        cotiz = createEntity(em);
    }

    @Test
    @Transactional
    public void createCotiz() throws Exception {
        int databaseSizeBeforeCreate = cotizRepository.findAll().size();

        // Create the Cotiz
        CotizDTO cotizDTO = cotizMapper.toDto(cotiz);
        restCotizMockMvc.perform(post("/api/cotizs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cotizDTO)))
            .andExpect(status().isCreated());

        // Validate the Cotiz in the database
        List<Cotiz> cotizList = cotizRepository.findAll();
        assertThat(cotizList).hasSize(databaseSizeBeforeCreate + 1);
        Cotiz testCotiz = cotizList.get(cotizList.size() - 1);
        assertThat(testCotiz.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testCotiz.getCurrency()).isEqualTo(DEFAULT_CURRENCY);
        assertThat(testCotiz.getPaymentDate()).isEqualTo(DEFAULT_PAYMENT_DATE);
        assertThat(testCotiz.getDueDate()).isEqualTo(DEFAULT_DUE_DATE);
        assertThat(testCotiz.getPaymentMode()).isEqualTo(DEFAULT_PAYMENT_MODE);
        assertThat(testCotiz.getComment()).isEqualTo(DEFAULT_COMMENT);
    }

    @Test
    @Transactional
    public void createCotizWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cotizRepository.findAll().size();

        // Create the Cotiz with an existing ID
        cotiz.setId(1L);
        CotizDTO cotizDTO = cotizMapper.toDto(cotiz);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCotizMockMvc.perform(post("/api/cotizs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cotizDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Cotiz in the database
        List<Cotiz> cotizList = cotizRepository.findAll();
        assertThat(cotizList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCotizs() throws Exception {
        // Initialize the database
        cotizRepository.saveAndFlush(cotiz);

        // Get all the cotizList
        restCotizMockMvc.perform(get("/api/cotizs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cotiz.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY.toString())))
            .andExpect(jsonPath("$.[*].paymentDate").value(hasItem(DEFAULT_PAYMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].dueDate").value(hasItem(DEFAULT_DUE_DATE.toString())))
            .andExpect(jsonPath("$.[*].paymentMode").value(hasItem(DEFAULT_PAYMENT_MODE.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())));
    }

    @Test
    @Transactional
    public void getCotiz() throws Exception {
        // Initialize the database
        cotizRepository.saveAndFlush(cotiz);

        // Get the cotiz
        restCotizMockMvc.perform(get("/api/cotizs/{id}", cotiz.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cotiz.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.currency").value(DEFAULT_CURRENCY.toString()))
            .andExpect(jsonPath("$.paymentDate").value(DEFAULT_PAYMENT_DATE.toString()))
            .andExpect(jsonPath("$.dueDate").value(DEFAULT_DUE_DATE.toString()))
            .andExpect(jsonPath("$.paymentMode").value(DEFAULT_PAYMENT_MODE.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCotiz() throws Exception {
        // Get the cotiz
        restCotizMockMvc.perform(get("/api/cotizs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCotiz() throws Exception {
        // Initialize the database
        cotizRepository.saveAndFlush(cotiz);
        int databaseSizeBeforeUpdate = cotizRepository.findAll().size();

        // Update the cotiz
        Cotiz updatedCotiz = cotizRepository.findOne(cotiz.getId());
        // Disconnect from session so that the updates on updatedCotiz are not directly saved in db
        em.detach(updatedCotiz);
        updatedCotiz
            .amount(UPDATED_AMOUNT)
            .currency(UPDATED_CURRENCY)
            .paymentDate(UPDATED_PAYMENT_DATE)
            .dueDate(UPDATED_DUE_DATE)
            .paymentMode(UPDATED_PAYMENT_MODE)
            .comment(UPDATED_COMMENT);
        CotizDTO cotizDTO = cotizMapper.toDto(updatedCotiz);

        restCotizMockMvc.perform(put("/api/cotizs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cotizDTO)))
            .andExpect(status().isOk());

        // Validate the Cotiz in the database
        List<Cotiz> cotizList = cotizRepository.findAll();
        assertThat(cotizList).hasSize(databaseSizeBeforeUpdate);
        Cotiz testCotiz = cotizList.get(cotizList.size() - 1);
        assertThat(testCotiz.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testCotiz.getCurrency()).isEqualTo(UPDATED_CURRENCY);
        assertThat(testCotiz.getPaymentDate()).isEqualTo(UPDATED_PAYMENT_DATE);
        assertThat(testCotiz.getDueDate()).isEqualTo(UPDATED_DUE_DATE);
        assertThat(testCotiz.getPaymentMode()).isEqualTo(UPDATED_PAYMENT_MODE);
        assertThat(testCotiz.getComment()).isEqualTo(UPDATED_COMMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingCotiz() throws Exception {
        int databaseSizeBeforeUpdate = cotizRepository.findAll().size();

        // Create the Cotiz
        CotizDTO cotizDTO = cotizMapper.toDto(cotiz);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCotizMockMvc.perform(put("/api/cotizs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cotizDTO)))
            .andExpect(status().isCreated());

        // Validate the Cotiz in the database
        List<Cotiz> cotizList = cotizRepository.findAll();
        assertThat(cotizList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCotiz() throws Exception {
        // Initialize the database
        cotizRepository.saveAndFlush(cotiz);
        int databaseSizeBeforeDelete = cotizRepository.findAll().size();

        // Get the cotiz
        restCotizMockMvc.perform(delete("/api/cotizs/{id}", cotiz.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cotiz> cotizList = cotizRepository.findAll();
        assertThat(cotizList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cotiz.class);
        Cotiz cotiz1 = new Cotiz();
        cotiz1.setId(1L);
        Cotiz cotiz2 = new Cotiz();
        cotiz2.setId(cotiz1.getId());
        assertThat(cotiz1).isEqualTo(cotiz2);
        cotiz2.setId(2L);
        assertThat(cotiz1).isNotEqualTo(cotiz2);
        cotiz1.setId(null);
        assertThat(cotiz1).isNotEqualTo(cotiz2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CotizDTO.class);
        CotizDTO cotizDTO1 = new CotizDTO();
        cotizDTO1.setId(1L);
        CotizDTO cotizDTO2 = new CotizDTO();
        assertThat(cotizDTO1).isNotEqualTo(cotizDTO2);
        cotizDTO2.setId(cotizDTO1.getId());
        assertThat(cotizDTO1).isEqualTo(cotizDTO2);
        cotizDTO2.setId(2L);
        assertThat(cotizDTO1).isNotEqualTo(cotizDTO2);
        cotizDTO1.setId(null);
        assertThat(cotizDTO1).isNotEqualTo(cotizDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cotizMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cotizMapper.fromId(null)).isNull();
    }
}
