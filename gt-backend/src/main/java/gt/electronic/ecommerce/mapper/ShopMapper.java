package gt.electronic.ecommerce.mapper;

import gt.electronic.ecommerce.dto.response.ShopResponseDTO;
import gt.electronic.ecommerce.dto.response.ShopSimpleResponseDTO;
import gt.electronic.ecommerce.entities.Shop;

/**
 * @author minh phuong
 * @created 01/11/2022 - 8:33 PM
 */
public interface ShopMapper {
  ShopResponseDTO shopToShopResponseDTO(Shop entity);
  ShopSimpleResponseDTO shopToShopSimpleResponseDTO(Shop entity);
}
