package gt.electronic.ecommerce.mapper;

import gt.electronic.ecommerce.dto.response.BrandResponseDTO;
import gt.electronic.ecommerce.entities.Brand;

/**
 * @author minh phuong
 * @created 11/09/2022 - 12:37 PM
 * @project gt-backend
 */
public interface BrandMapper {
  BrandResponseDTO brandToBrandResponseDTO(Brand entity);
}
