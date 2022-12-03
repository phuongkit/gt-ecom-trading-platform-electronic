package gt.electronic.ecommerce.repositories;

import gt.electronic.ecommerce.entities.Order;
import gt.electronic.ecommerce.entities.Shop;
import gt.electronic.ecommerce.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author minh phuong
 * @created 11/09/2022 - 10:03 AM
 * @project gt-backend
 */
@Repository
@Transactional
public interface OrderRepository extends JpaRepository<Order, Long> {
  Page<Order> findAllByUser(User user, Pageable pageable);
  @Query(value = "select distinct o from Order o inner join OrderShop os on o = os.order where os.shop = :shop")
  Page<Order> findAllByShop(Shop shop, Pageable pageable);
  List<Order> findAllByPaymentOrderCode(String paymentOrderCode);
}
