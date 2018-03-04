package mr.ndoumri.mutuelle.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Engagement.
 */
@Entity
@Table(name = "engagement")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Engagement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "expected_amount")
    private Double expectedAmount;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @Column(name = "jhi_comment")
    private String comment;

    @ManyToOne
    private Cotiz cotiz;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Engagement name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getExpectedAmount() {
        return expectedAmount;
    }

    public Engagement expectedAmount(Double expectedAmount) {
        this.expectedAmount = expectedAmount;
        return this;
    }

    public void setExpectedAmount(Double expectedAmount) {
        this.expectedAmount = expectedAmount;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public Engagement startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public Engagement endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public String getComment() {
        return comment;
    }

    public Engagement comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Cotiz getCotiz() {
        return cotiz;
    }

    public Engagement cotiz(Cotiz cotiz) {
        this.cotiz = cotiz;
        return this;
    }

    public void setCotiz(Cotiz cotiz) {
        this.cotiz = cotiz;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Engagement engagement = (Engagement) o;
        if (engagement.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), engagement.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Engagement{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", expectedAmount=" + getExpectedAmount() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
