package gt.electronic.ecommerce.services;

import gt.electronic.ecommerce.dto.request.DescriptionCreationDTO;
import gt.electronic.ecommerce.dto.response.DescriptionResponseDTO;
import gt.electronic.ecommerce.dto.response.ResponseObject;
import gt.electronic.ecommerce.entities.Description;
import org.springframework.http.ResponseEntity;

import java.util.List;

/**
 * @author minh phuong
 * @created 11/09/2022 - 8:18 PM
 */
public interface DescriptionService {
  List<DescriptionResponseDTO> getAllDescriptions();

  DescriptionResponseDTO getDescriptionById(Long id);

  Description createDescription(Description description);

  Description updateDescription(Long id, Description description);

  Description deleteDescriptionById(Long id);
}
