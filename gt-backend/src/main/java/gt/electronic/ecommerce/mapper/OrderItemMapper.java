package gt.electronic.ecommerce.mapper;

import gt.electronic.ecommerce.dto.request.CartDetailCreationDTO;
import gt.electronic.ecommerce.dto.request.OrderDetailCreationDTO;
import gt.electronic.ecommerce.dto.response.CartResponseDTO;
import gt.electronic.ecommerce.dto.response.OrderDetailResponseDTO;
import gt.electronic.ecommerce.dto.response.OrderResponseDTO;
import gt.electronic.ecommerce.entities.Order;
import gt.electronic.ecommerce.entities.OrderItem;
import gt.electronic.ecommerce.entities.User;

import java.util.List;
import java.util.Set;

/**
 * @author minh phuong
 * @created 20/09/2022 - 9:34 PM
 * @project gt-backend
 */
public interface OrderItemMapper {
  Set<OrderItem> orderDetailCreationDTOsToOrderItems(Order order, List<OrderDetailCreationDTO> creationDTOList);
  Set<OrderItem> cartDetailCreationDTOsToOrderItems(User user, List<CartDetailCreationDTO> creationDTOList);
  OrderDetailResponseDTO orderItemToOrderDetailResponseDTO(OrderItem entity);
}
