package gt.electronic.ecommerce.controller;

import gt.electronic.ecommerce.entities.Role;
import gt.electronic.ecommerce.services.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author minh phuong
 * @created 08/09/2022 - 8:58 PM
 * @project gt-backend
 */
@RestController
@RequestMapping(value = "/api/v1/roles")
@CrossOrigin(origins = "*")
//@RolesAllowed({ERole.Names.ADMIN})
public class RoleController {
  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
  public static final String branchName = Role.class.getSimpleName();
  @Autowired
  private RoleService roleService;

  @GetMapping
  public List<Role> getAllRoles() {
    return roleService.getAllRole();
  }
}
