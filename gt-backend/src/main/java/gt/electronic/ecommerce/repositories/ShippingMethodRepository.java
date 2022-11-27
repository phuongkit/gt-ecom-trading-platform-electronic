package gt.electronic.ecommerce.repositories;

import gt.electronic.ecommerce.entities.Payment;
import gt.electronic.ecommerce.entities.ShippingMethod;
import gt.electronic.ecommerce.models.enums.EPayment;
import gt.electronic.ecommerce.models.enums.EShippingMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * @author minh phuong
 * @created 08/10/2022 - 8:16 PM
 * @project gt-backend
 */
@Repository
@Transactional
public interface ShippingMethodRepository extends JpaRepository<ShippingMethod, Integer> {
  Optional<ShippingMethod> findByName(EShippingMethod name);
}
