package gt.electronic.ecommerce.repositories;

import gt.electronic.ecommerce.entities.Shipment;
import gt.electronic.ecommerce.entities.User;
import gt.electronic.ecommerce.models.enums.EShipmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    Page<Shipment> findAllByUser(User shipper, Pageable pageable);

    Page<Shipment> findAllByUserAndAndStatus(User shipper, EShipmentStatus status, Pageable pageable);
}
