package gt.electronic.ecommerce.models.clazzs;

import io.swagger.v3.oas.annotations.tags.Tags;
import lombok.Data;
import lombok.ToString;

import java.util.Map;

/**
 * @author minh phuong
 * @created 20/11/2022 - 11:01 PM
 */
@Data
@ToString
public class GHNItem {
  String name;
  int quantity;
}
