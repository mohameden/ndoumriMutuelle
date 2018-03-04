package mr.ndoumri.mutuelle.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import mr.ndoumri.mutuelle.domain.enumeration.PaymentMode;

/**
 * A DTO for the Cotiz entity.
 */
public class CotizDTO implements Serializable {

    private Long id;

    private Double amount;

    private String currency;

    private Instant paymentDate;

    private Instant dueDate;

    private PaymentMode paymentMode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Instant getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Instant paymentDate) {
        this.paymentDate = paymentDate;
    }

    public Instant getDueDate() {
        return dueDate;
    }

    public void setDueDate(Instant dueDate) {
        this.dueDate = dueDate;
    }

    public PaymentMode getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(PaymentMode paymentMode) {
        this.paymentMode = paymentMode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CotizDTO cotizDTO = (CotizDTO) o;
        if(cotizDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cotizDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CotizDTO{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", currency='" + getCurrency() + "'" +
            ", paymentDate='" + getPaymentDate() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", paymentMode='" + getPaymentMode() + "'" +
            "}";
    }
}
