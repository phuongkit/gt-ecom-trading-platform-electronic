package gt.electronic.ecommerce.repositories;

import gt.electronic.ecommerce.entities.Product;
import gt.electronic.ecommerce.entities.ProductBlackList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Repository
@Transactional
public interface ProcedureRepository extends JpaRepository<Product, Long> {

    @Query(value = "CALL updateBlackListProduct(:inShopId, :inStartDate, :inMinAll, :inMinNeg);", nativeQuery = true)
    void updateBlackListProduct(@Param("inShopId") Long shopId,
                                @Param("inStartDate") Date starDate,
                                @Param("inMinAll") int minAll,
                                @Param("inMinNeg") int minNeg);

    @Query(value = "select pbl from ProductBlackList pbl" +
            " where pbl.enabled = true and pbl.shopId = :shopId")
    List<ProductBlackList> getProductBlackListByShop(@Param("shopId") Long shopId);
}
