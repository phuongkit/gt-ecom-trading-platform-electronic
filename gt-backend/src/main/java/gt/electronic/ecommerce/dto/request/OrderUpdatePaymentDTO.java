package gt.electronic.ecommerce.dto.request;

import gt.electronic.ecommerce.models.enums.EPayment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author minh phuong
 * @created 13/10/2022 - 4:38 PM
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderUpdatePaymentDTO {
  private EPayment payment;
  private boolean paid;
}
