package gt.electronic.ecommerce.mapper.impls;

import gt.electronic.ecommerce.dto.response.DiscountResponseDTO;
import gt.electronic.ecommerce.entities.Discount;
import gt.electronic.ecommerce.mapper.DiscountMapper;
import org.springframework.stereotype.Component;

/**
 * @author minh phuong
 * @created 20/09/2022 - 9:55 PM
 * @project gt-backend
 */
@Component
public class DiscountMapperImpl implements DiscountMapper {
  @Override
  public DiscountResponseDTO discountToDiscountResponseDTO(Discount entity) {
    return null;
  }
}
