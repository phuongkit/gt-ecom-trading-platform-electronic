package gt.electronic.ecommerce.mapper;

import gt.electronic.ecommerce.dto.response.AddressResponseDTO;
import gt.electronic.ecommerce.entities.Address;
import gt.electronic.ecommerce.entities.Location;

/**
 * @author minh phuong
 * @created 20/09/2022 - 9:58 PM
 * @project gt-backend
 */
public interface AddressMapper {
  AddressResponseDTO lineAndLocationToAddressResponseDTO(String line, Location location);

  AddressResponseDTO addressesToAddressResponseDTO(Address address);
}
