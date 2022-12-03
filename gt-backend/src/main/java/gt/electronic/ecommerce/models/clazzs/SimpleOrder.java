package gt.electronic.ecommerce.models.clazzs;

import java.math.BigDecimal;

/**
 * @author minh phuong
 * @created 03/12/2022 - 4:25 PM
 */
public class SimpleOrder {
  private Long orderId;
  private BigDecimal totalPriceProduct;
  private BigDecimal totalFee;
  private BigDecimal totalDiscount;
  private BigDecimal totalPrice;
}
