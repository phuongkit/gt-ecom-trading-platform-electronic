package gt.electronic.ecommerce.models.interfaces;

import lombok.Data;

/**
 * @author minh phuong
 * @created 03/12/2022 - 11:57 AM
 */
public interface IInfoRating {
  Long getTotalVote();
  int getStar();
}
