package gt.electronic.ecommerce.models.clazzs;

import gt.electronic.ecommerce.entities.Location;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author minh phuong
 * @created 02/11/2022 - 10:00 PM
 */
@Data
@AllArgsConstructor
public class FullAddress {
  private String line;
  private Location location;
}
