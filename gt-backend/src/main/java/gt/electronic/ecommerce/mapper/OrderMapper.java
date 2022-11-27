package gt.electronic.ecommerce.mapper;

import gt.electronic.ecommerce.dto.response.BrandResponseDTO;
import gt.electronic.ecommerce.dto.response.OrderResponseDTO;
import gt.electronic.ecommerce.entities.Brand;
import gt.electronic.ecommerce.entities.Order;
import gt.electronic.ecommerce.models.clazzs.OrderPaymentOnly;

/**
 * @author minh phuong
 * @created 20/09/2022 - 9:34 PM
 * @project gt-backend
 */
public interface OrderMapper {
  OrderResponseDTO orderToOrderResponseDTO(Order entity, Integer shopId, boolean...isFull);

  OrderPaymentOnly orderToOrderPaymentOnly(Order entity);
}
