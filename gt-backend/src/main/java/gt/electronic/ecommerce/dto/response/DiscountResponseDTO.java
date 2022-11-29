package gt.electronic.ecommerce.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * @author minh phuong
 * @created 11/09/2022 - 10:18 AM
 * @project gt-backend
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DiscountResponseDTO {
  private Long id;
  private String title;
  private String description;
  private Double percent;
  private String code;
  private Date startDate;
  private Date endDate;
}
