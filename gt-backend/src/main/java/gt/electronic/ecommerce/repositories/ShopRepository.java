package gt.electronic.ecommerce.repositories;

import gt.electronic.ecommerce.entities.Shop;
import gt.electronic.ecommerce.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * @author minh phuong
 * @created 11/09/2022 - 10:02 AM
 * @project gt-backend
 */
@Repository
@Transactional
public interface ShopRepository extends JpaRepository<Shop, Integer> {
  @Query(
      value =
          "select s from Shop s where :keyword is null "
              + "or length(:keyword) < 1 "
              + "or (lower(concat(s.id, ' ', s.name)) like lower(concat('%', :keyword,'%'))) ")
  Page<Shop> findAll(String keyword, Pageable pageable);
  Optional<Shop> findBySlug(String slug);
  Optional<Shop> findByName(String name);
  Optional<Shop> findByUser(User user);
}
