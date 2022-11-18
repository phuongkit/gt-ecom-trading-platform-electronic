package gt.electronic.ecommerce.mapper;

import gt.electronic.ecommerce.dto.response.AuthResponse;
import gt.electronic.ecommerce.entities.User;

/**
 * @author minh phuong
 * @created 01/10/2022 - 12:11 PM
 * @project gt-backend
 */
public interface AuthMapper {
  AuthResponse userToAuthResponse(User entity, String accessToken);
}
