package gt.electronic.ecommerce.repositories;

import gt.electronic.ecommerce.entities.OrderShop;
import gt.electronic.ecommerce.entities.Shop;
import gt.electronic.ecommerce.entities.keys.OrderShopKey;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author minh phuong
 * @created 03/12/2022 - 8:26 PM
 */
public interface OrderShopRepository extends JpaRepository<OrderShop, OrderShopKey> {
  Page<OrderShop> findAllByShop(Shop shop, Pageable pageable);
}
