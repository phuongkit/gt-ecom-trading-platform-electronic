package gt.electronic.ecommerce.models.clazzs;

import lombok.Data;
import lombok.ToString;

import java.util.List;

/**
 * @author minh phuong
 * @created 30/11/2022 - 12:22 PM
 */
@Data
@ToString
public class DiscountCodes {
  private List<String> discountCodes;
}
