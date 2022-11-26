package gt.electronic.ecommerce.services;

import gt.electronic.ecommerce.dto.request.UserCreationDTO;
import gt.electronic.ecommerce.dto.response.ResponseObject;
import gt.electronic.ecommerce.dto.response.UserResponseDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @author minh phuong
 * @created 11/09/2022 - 10:01 AM
 */
public interface DiscountService {
  List<UserResponseDTO> getAllUser(String keyword, Pageable pageable);

  UserResponseDTO getUserById(Long id);

  ResponseEntity<ResponseObject> createUser(UserCreationDTO userCreationDTO, MultipartFile multipartFile);

  ResponseEntity<ResponseObject> updateUser(Long id, UserCreationDTO userCreationDTO, MultipartFile multipartFile);

  ResponseEntity<ResponseObject> deleteUserById(Long id);
}
