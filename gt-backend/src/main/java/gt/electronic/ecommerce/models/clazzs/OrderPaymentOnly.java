package gt.electronic.ecommerce.models.clazzs;

import gt.electronic.ecommerce.entities.Order;
import gt.electronic.ecommerce.entities.User;
import gt.electronic.ecommerce.models.enums.EPayment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

/**
 * @author minh phuong
 * @created 13/10/2022 - 4:42 PM
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderPaymentOnly extends Order {
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;
  private EPayment payment;

  @Column(name = "pay_at")
  @Temporal(TemporalType.TIMESTAMP)
  private Date payAt;
}
