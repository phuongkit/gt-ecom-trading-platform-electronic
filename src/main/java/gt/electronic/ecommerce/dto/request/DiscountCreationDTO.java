package gt.electronic.ecommerce.dto.request;

import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author minh phuong
 * @created 24/11/2022 - 3:59 PM
 */
@Data
@ToString
public class DiscountCreationDTO {
  private String name;
  private String description;
  private Integer quantity;
  private Double percent;
  private String code;
  private BigDecimal cappedAt;
  private BigDecimal price;
  private BigDecimal minSpend;
  private Date startDate;
  private Date endDate;
}
