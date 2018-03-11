package mr.ndoumri.mutuelle.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;
import mr.ndoumri.mutuelle.domain.enumeration.PaymentMode;

/**
 * A DTO for the Cotiz entity.
 */
public class CotizDTO implements Serializable {

	private static final long serialVersionUID = -3309247317644162344L;

	private Long id;

    private Double amount;

    private String currency;

    private Instant paymentDate;

    private Instant dueDate;

    private PaymentMode paymentMode;

    private String comment;

    private Long userId;

    private Long engagementId;
    
    private String userLogin;
    
    private String engagementName;

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

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getEngagementId() {
        return engagementId;
    }

    public void setEngagementId(Long engagementId) {
        this.engagementId = engagementId;
    }

    public String getUserLogin() {
		return userLogin;
	}

	public void setUserLogin(String userLogin) {
		this.userLogin = userLogin;
	}

	public String getEngagementName() {
		return engagementName;
	}

	public void setEngagementName(String engagementName) {
		this.engagementName = engagementName;
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
            ", comment='" + getComment() + "'" +
            "}";
    }
}
