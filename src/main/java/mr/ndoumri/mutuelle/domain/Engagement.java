package mr.ndoumri.mutuelle.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
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

    @OneToMany(mappedBy = "engagement")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Cotiz> cotizs = new HashSet<>();

    @ManyToOne
    private User owner;

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

    public Set<Cotiz> getCotizs() {
        return cotizs;
    }

    public Engagement cotizs(Set<Cotiz> cotizs) {
        this.cotizs = cotizs;
        return this;
    }

    public Engagement addCotiz(Cotiz cotiz) {
        this.cotizs.add(cotiz);
        cotiz.setEngagement(this);
        return this;
    }

    public Engagement removeCotiz(Cotiz cotiz) {
        this.cotizs.remove(cotiz);
        cotiz.setEngagement(null);
        return this;
    }

    public void setCotizs(Set<Cotiz> cotizs) {
        this.cotizs = cotizs;
    }

    public User getOwner() {
        return owner;
    }

    public Engagement owner(User user) {
        this.owner = user;
        return this;
    }

    public void setOwner(User user) {
        this.owner = user;
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
