package gt.electronic.ecommerce.models.clazzs;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * @author minh phuong
 * @created 03/12/2022 - 4:23 PM
 */
@Data
@ToString
public class GroupOrderByDate {
  //  @JsonFormat(pattern = "yyyy-MM-dd")
  private String dateStatistic;
  private BigDecimal totalPrice;
  List<SimpleOrder> orderDetails;
}
