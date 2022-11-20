package gt.electronic.ecommerce.repositories;

import gt.electronic.ecommerce.entities.Role;
import gt.electronic.ecommerce.models.enums.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * @author minh phuong
 * @created 07/09/2022 - 11:14 PM
 * @project gt-backend
 */
@Repository
@Transactional
public interface RoleRepository extends JpaRepository<Role, Integer> {
  Optional<Role> findByName(ERole name);
}
