package gt.electronic.ecommerce.repositories;

import gt.electronic.ecommerce.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * @author minh phuong
 * @created 11/09/2022 - 10:02 AM
 */
@Repository
@Transactional
public interface CategoryRepository extends JpaRepository<Category, Integer> {
  @Query(
      value =
          "select c from Category c where " +
              "lower(c.name) like lower(concat('%', :keyword,'%'))")
  List<Category> findAll(String keyword);

  Optional<Category> findByName(String name);

  Optional<Category> findBySlug(String slug);
}
