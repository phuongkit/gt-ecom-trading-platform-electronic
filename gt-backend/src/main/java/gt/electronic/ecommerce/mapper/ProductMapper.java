package gt.electronic.ecommerce.mapper;

import gt.electronic.ecommerce.dto.response.BrandResponseDTO;
import gt.electronic.ecommerce.dto.response.ProductGalleryDTO;
import gt.electronic.ecommerce.dto.response.ProductResponseDTO;
import gt.electronic.ecommerce.entities.Brand;
import gt.electronic.ecommerce.entities.Product;

/**
 * @author minh phuong
 * @created 11/09/2022 - 9:18 PM
 * @project gt-backend
 */
public interface ProductMapper {
  ProductResponseDTO productToProductResponseDTO(Product entity, Boolean...haveSentiment);

  ProductGalleryDTO productToProductGalleryDTO(Product entity);
}
