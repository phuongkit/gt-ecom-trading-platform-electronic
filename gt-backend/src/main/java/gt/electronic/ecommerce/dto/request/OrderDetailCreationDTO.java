package gt.electronic.ecommerce.dto.request;

import gt.electronic.ecommerce.dto.response.ProductGalleryDTO;
import gt.electronic.ecommerce.dto.response.SaleResponseDTO;
import gt.electronic.ecommerce.entities.Order;
import gt.electronic.ecommerce.entities.Product;
import gt.electronic.ecommerce.entities.Sale;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

/**
 * @author minh phuong
 * @created 20/09/2022 - 9:25 PM
 * @project gt-backend
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailCreationDTO {
  private Long productId;
  private Integer quantity;
  private String saleName;
  private String note;
  public OrderDetailCreationDTO (Product product, Integer quantity) {
    this.productId = product.getId();
    this.quantity = quantity;
  }
}
