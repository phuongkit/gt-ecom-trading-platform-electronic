package gt.electronic.ecommerce.repositories;

import gt.electronic.ecommerce.entities.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface MessageRepository extends JpaRepository<Message, Long> {

    Page<Message> findAllByShopId(Long shopId, Pageable pageable);
}
