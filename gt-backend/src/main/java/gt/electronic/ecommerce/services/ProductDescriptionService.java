package gt.electronic.ecommerce.services;

import gt.electronic.ecommerce.entities.ProductDescription;
import gt.electronic.ecommerce.entities.keys.ProductDescriptionKey;

/**
 * @author minh phuong
 * @created 11/09/2022 - 8:48 PM
 */
public interface ProductDescriptionService {
  ProductDescription createOrUpdateProductDescription(ProductDescription productDescription);

  void deleteProductDescriptionById(ProductDescriptionKey id);
}
