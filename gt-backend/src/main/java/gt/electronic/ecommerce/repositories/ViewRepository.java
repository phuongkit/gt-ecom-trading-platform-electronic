package gt.electronic.ecommerce.repositories;

import gt.electronic.ecommerce.entities.Product;
import gt.electronic.ecommerce.models.interfaces.IProductSentiment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public interface ViewRepository extends JpaRepository<Product, Long> {

    @Query(value = "select * from sentimentAnalysis sa" +
            " where (:shopId is null or :shopId = sa.shop_id)" +
            " and (:productId is null or :productId = sa.product_id)", nativeQuery = true)
    List<IProductSentiment> getProductSentiment(
            @Param("productId") Long productId,
            @Param("shopId") Long shopId);
}
