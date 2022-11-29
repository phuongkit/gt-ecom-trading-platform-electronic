package gt.electronic.ecommerce.mapper.impls;

import gt.electronic.ecommerce.dto.response.DiscountResponseDTO;
import gt.electronic.ecommerce.dto.response.OrderDetailResponseDTO;
import gt.electronic.ecommerce.dto.response.OrderResponseDTO;
import gt.electronic.ecommerce.entities.Discount;
import gt.electronic.ecommerce.entities.Order;
import gt.electronic.ecommerce.entities.OrderItem;
import gt.electronic.ecommerce.mapper.*;
import gt.electronic.ecommerce.models.clazzs.OrderPaymentOnly;
import gt.electronic.ecommerce.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;

/**
 * @author minh phuong
 * @created 20/09/2022 - 9:34 PM
 * @project gt-backend
 */
@Component
public class OrderMapperImpl implements OrderMapper {
  private AddressMapper addressMapper;

  @Autowired
  public void AddressMapper(AddressMapper addressMapper) {
    this.addressMapper = addressMapper;
  }

  private DiscountMapper discountMapper;

  @Autowired
  public void DiscountMapper(DiscountMapper discountMapper) {
    this.discountMapper = discountMapper;
  }

  private OrderItemMapper orderItemMapper;

  @Autowired
  public void OrderItemMapper(OrderItemMapper orderItemMapper) {
    this.orderItemMapper = orderItemMapper;
  }

  private UserMapper userMapper;

  @Autowired
  public void UserMapper(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  @Override
  public OrderResponseDTO orderToOrderResponseDTO(Order entity, Integer shopId, boolean... isFull) {
    if (entity == null) {
      return null;
    }
    OrderResponseDTO responseDTO = new OrderResponseDTO();
    responseDTO.setId(entity.getId());
    if (entity.getUser() != null) {
      responseDTO.setUser(this.userMapper.userToUserSimpleResponseDTO(entity.getUser()));
    }
    responseDTO.setGender(entity.getGender().ordinal());
    responseDTO.setFullName(entity.getFullName());
    responseDTO.setTotalPrice(Utils.getTotalPriceFromOrderItems(entity.getOrderItemSet(), shopId));
    if (entity.getPayment() != null) {
      responseDTO.setPayment(entity.getPayment().getName().ordinal());
    }
    if (entity.getShippingMethod() != null) {
      responseDTO.setShippingMethod(entity.getShippingMethod().getName().ordinal());
    }
    responseDTO.setTransportFee(entity.getTransportFee());
    responseDTO.setEmail(entity.getEmail());
    responseDTO.setPhone(entity.getPhone());
    if (entity.getDiscounts() != null && entity.getDiscounts().size() > 0) {
      DiscountResponseDTO[] discountDTOs= new DiscountResponseDTO[entity.getDiscounts().size()];
      int i =0;
      for (Discount discount:entity.getDiscounts()) {
        discountDTOs[i] = new DiscountResponseDTO();
        discountDTOs[i] = this.discountMapper.discountToDiscountResponseDTO(discount);
        i++;
      }
      responseDTO.setDiscounts(discountDTOs);
    }
    if (entity.getLocation() != null) {
      responseDTO.setAddress(
          this.addressMapper.lineAndLocationToAddressResponseDTO(
              entity.getLine(), entity.getLocation()));
    }
    responseDTO.setStatus(entity.getStatus().ordinal());
    responseDTO.setPayAt(entity.getPayAt());
    responseDTO.setNote(entity.getNote());
    if (isFull.length > 0 && isFull[0]) {
      if (!entity.getOrderItemSet().isEmpty()) {
        OrderDetailResponseDTO[] orderItems =
            new OrderDetailResponseDTO[entity.getOrderItemSet().size()];
        int i = 0;
        for (OrderItem orderItem : entity.getOrderItemSet()) {
          if (shopId == null || Objects.equals(orderItem.getProduct().getShop().getId(), shopId)) {
            orderItems[i] = new OrderDetailResponseDTO();
            orderItems[i] = this.orderItemMapper.orderItemToOrderDetailResponseDTO(orderItem);
            i++;
          }
        }
        responseDTO.setOrderItems(orderItems);
      }
    }
    return responseDTO;
  }

  @Override public OrderPaymentOnly orderToOrderPaymentOnly(Order entity) {
    if (entity == null) {
      return null;
    }
    return new OrderPaymentOnly(entity.getId(), entity.getUser(), entity.getPayment(), entity.getPayAt());
  }
}
