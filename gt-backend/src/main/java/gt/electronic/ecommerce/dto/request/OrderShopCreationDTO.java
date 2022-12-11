package gt.electronic.ecommerce.dto.request;

import gt.electronic.ecommerce.entities.Shop;
import gt.electronic.ecommerce.models.enums.EShippingMethod;
import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

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
  @NotNull(message = "OrderItems not null!")
  private List<OrderDetailCreationDTO> items;
  public OrderShopCreationDTO(Shop shop, List<OrderDetailCreationDTO> items ) {
    this.shopId = shop.getId();
    this.shippingMethod = EShippingMethod.GHN_EXPRESS;
    this.expectedDeliveryTime = new Date();
    this.totalFee = new BigDecimal(0);
    this.items = items;
  }
}
