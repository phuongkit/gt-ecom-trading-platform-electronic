package gt.electronic.ecommerce.models.clazzs;

import lombok.*;

/**
 * @author minh phuong
 * @created 04/10/2022 - 6:05 PM
 * @project gt-backend
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RatingDetail {
  private int star;
  private long totalVote;
  private int percent;
}
