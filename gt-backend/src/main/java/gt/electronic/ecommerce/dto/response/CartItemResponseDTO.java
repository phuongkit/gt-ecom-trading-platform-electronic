package gt.electronic.ecommerce.dto.response;

import lombok.Data;

import java.math.BigDecimal;

/**
 * @author minh phuong
 * @created 15/10/2022 - 2:54 PM
 */
@Data
public class CartItemResponseDTO {
  private Long id;
  private UserSimpleResponseDTO user;
  private ProductGalleryDTO product;
  private BigDecimal price;
  private Double sale;
  private Integer quantity;
  private String note;
}
