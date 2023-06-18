package gt.electronic.ecommerce.services;

import gt.electronic.ecommerce.dto.response.OrderResponseDTO;
import gt.electronic.ecommerce.dto.response.ShipmentResponseDTO;
import gt.electronic.ecommerce.models.enums.EShipmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ShipmentService {
    Page<OrderResponseDTO> getAllOrdersSameAre(String loginKey, Pageable pageable);

    List<ShipmentResponseDTO> receiveOrderShipments(String loginKey, List<Long> orderShipmentIds);

    Page<ShipmentResponseDTO> getAllOrderShipmentsByShipper(String loginKey, EShipmentStatus status, Pageable pageable);
}
