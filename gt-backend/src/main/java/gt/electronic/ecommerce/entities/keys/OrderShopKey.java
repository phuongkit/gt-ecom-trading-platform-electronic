package gt.electronic.ecommerce.entities.keys;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

/**
 * @author minh phuong
 * @created 03/12/2022 - 8:31 PM
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class OrderShopKey implements Serializable {
  @Column(name = "product_id")
  Long orderId;

  @Column(name = "shop_id")
  Integer shopId;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof OrderShopKey)) return false;
    OrderShopKey that = (OrderShopKey) o;
    return this.getOrderId().equals(that.getOrderId()) && this.getShopId().equals(that.getShopId());
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.getOrderId(), this.getShopId());
  }
}
