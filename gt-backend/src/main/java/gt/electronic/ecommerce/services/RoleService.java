package gt.electronic.ecommerce.services;

import gt.electronic.ecommerce.dto.response.ResponseObject;
import gt.electronic.ecommerce.entities.Role;
import org.springframework.http.ResponseEntity;

import java.util.List;

/**
 * @author minh phuong
 * @created 08/09/2022 - 8:34 PM
 */
public interface RoleService {
  List<Role> getAllRole();

  Role getRoleById(Integer id);

  Role createRole(Role role);

  Role updateRole(Integer id, Role role);

  Role deleteRoleById(Integer id);
}
