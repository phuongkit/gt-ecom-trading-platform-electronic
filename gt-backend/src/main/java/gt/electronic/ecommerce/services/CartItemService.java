package gt.electronic.ecommerce.services;

import gt.electronic.ecommerce.dto.request.CartDetailCreationDTO;
import gt.electronic.ecommerce.dto.request.CartItemCreationDTO;
import gt.electronic.ecommerce.dto.response.OrderDetailResponseDTO;
import gt.electronic.ecommerce.dto.response.ResponseObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

/**
 * @author minh phuong
 * @created 11/09/2022 - 10:00 AM
 */
public interface CartItemService {
  List<OrderDetailResponseDTO> getAllCartItemByUser(String loginKey, Integer userId, Pageable pageable);

  OrderDetailResponseDTO getCartItemById(Long id);

  OrderDetailResponseDTO getCartItemByUserAndProduct(Integer userId, Long productId);

  OrderDetailResponseDTO createCartItem(String loginKey, CartItemCreationDTO creationDTO);

  OrderDetailResponseDTO updateCartItem(String loginKey, Long id, CartItemCreationDTO creationDTO);

  OrderDetailResponseDTO deleteCartItemById(String loginKey, Integer userId, Long id);

  List<OrderDetailResponseDTO> updateCart(String loginKey, List<CartDetailCreationDTO> creationDTOList);
}
