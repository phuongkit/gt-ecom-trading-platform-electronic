package gt.electronic.ecommerce.dto.request;

import gt.electronic.ecommerce.models.enums.EShippingMethod;
import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author minh phuong
 * @created 03/12/2022 - 8:50 PM
 */
@Data
@ToString
public class OrderShopCreationDTO {
  private Integer shopId;
  private EShippingMethod shippingMethod;
  private Date expectedDeliveryTime;
  private BigDecimal totalFee;
}
