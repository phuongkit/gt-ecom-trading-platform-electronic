package gt.electronic.ecommerce.mapper;

import gt.electronic.ecommerce.dto.request.AddressCreationDTO;
import gt.electronic.ecommerce.entities.Location;


/**
 * @author minh phuong
 * @created 08/10/2022 - 8:08 PM
 * @project gt-backend
 */
public interface LocationMapper {
  Location AddressCreationDTOToLocation(AddressCreationDTO creationDTO);
}
