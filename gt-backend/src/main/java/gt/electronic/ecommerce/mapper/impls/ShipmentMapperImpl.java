package gt.electronic.ecommerce.mapper.impls;

import gt.electronic.ecommerce.dto.response.ShipmentResponseDTO;
import gt.electronic.ecommerce.entities.Shipment;
import gt.electronic.ecommerce.mapper.AddressMapper;
import gt.electronic.ecommerce.mapper.ShipmentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ShipmentMapperImpl implements ShipmentMapper {
    private AddressMapper addressMapper;

    @Autowired
    public void AddressMapper(AddressMapper addressMapper) {
        this.addressMapper = addressMapper;
    }

    @Override
    public ShipmentResponseDTO shipmentToShipmentResponseDTO(Shipment entity) {
        if (entity == null) {
            return null;
        }
        ShipmentResponseDTO responseDTO = new ShipmentResponseDTO();
        responseDTO.setId(entity.getId());
        responseDTO.setUserId(entity.getUser().getId());
        responseDTO.setOrderShopId(entity.getOrderShopId());
        if (entity.getFromLocation() != null) {
            responseDTO.setFromAddress(this.addressMapper.lineAndLocationToAddressResponseDTO(entity.getFromLine(),
                                                                                              entity.getFromLocation()));
        }
        if (entity.getToLocation() != null) {
            responseDTO.setToAddress(this.addressMapper.lineAndLocationToAddressResponseDTO(entity.getToLine(),
                                                                                            entity.getToLocation()));
        }
        responseDTO.setTotalPrice(entity.getTotalPrice());
        responseDTO.setStatus(entity.getStatus().toString());
        responseDTO.setCompletedAt(entity.getCompletedAt());
        responseDTO.setCreatedAt(entity.getCreatedAt());
        return responseDTO;
    }
}
