package gt.electronic.ecommerce.repositories;

import gt.electronic.ecommerce.entities.Feedback;
import gt.electronic.ecommerce.entities.Product;
import gt.electronic.ecommerce.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author minh phuong
 * @created 12/09/2022 - 8:56 PM
 * @project gt-backend
 */
@Repository
@Transactional
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
  @Query(
      value =
          "select fb from Feedback fb where "
              + "(:product is null or fb.product = :product) "
              + "and (:author is null or fb.author = :author) "
              + "order by fb.createdAt desc")
  Page<Feedback> getAllMainFeedbackByProductOrUser(Product product, User author, Pageable pageable);

  @Query(
      value =
          "select fb from Feedback fb where "
              + "(:product is null or fb.product = :product) "
              + "and (:author is null or fb.author = :author) "
              + "order by fb.createdAt asc")
  List<Feedback> getFeedbackByProductAndUser(Product product, User author);

  List<Feedback> findAllByProduct(Product product);
}
