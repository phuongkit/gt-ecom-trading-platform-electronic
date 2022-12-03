package gt.electronic.ecommerce.dto.request;

import lombok.Data;
import lombok.Getter;

/**
 * @author minh phuong
 * @created 19/09/2022 - 5:00 PM
 * @project gt-backend
 */
@Data
public class CartDetailCreationDTO {
  private Long productId;
  private Long quantity;
}
