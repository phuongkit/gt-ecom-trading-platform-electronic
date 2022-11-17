package gt.electronic.ecommerce.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * @author minh phuong
 * @created 11/09/2022 - 10:15 AM
 * @project gt-backend
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductGalleryDTO {
  private Long id;
  private String img;
  private String title;
  private BigDecimal price;
  private Integer availableQuantity;
  private Integer soldQuantity;
  private String url;
  private String slug;
  private String promotion;
  private double discount;
  private String tag;
  private double star;
  private long totalVote;
  private String brand;
  private String brandSlug;
  private String category;
  private String categorySlug;
}
