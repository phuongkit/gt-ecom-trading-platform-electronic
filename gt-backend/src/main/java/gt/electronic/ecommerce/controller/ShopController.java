package gt.electronic.ecommerce.controller;

import gt.electronic.ecommerce.dto.request.ShopCreationDTO;
import gt.electronic.ecommerce.dto.response.ResponseObject;
import gt.electronic.ecommerce.dto.response.ShopResponseDTO;
import gt.electronic.ecommerce.entities.Shop;
import gt.electronic.ecommerce.models.clazzs.ShopOverview;
import gt.electronic.ecommerce.models.enums.ERole;
import gt.electronic.ecommerce.services.ShopService;
import gt.electronic.ecommerce.services.StatisticService;
import gt.electronic.ecommerce.utils.JwtTokenUtil;
import gt.electronic.ecommerce.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

import static gt.electronic.ecommerce.utils.Utils.DEFAULT_PAGE;
import static gt.electronic.ecommerce.utils.Utils.DEFAULT_SIZE;

/**
 * @author minh phuong
 * @created 03/11/2022 - 11:23 PM
 */
@RestController
@RequestMapping("/api/v1/shops")
@CrossOrigin(origins = "*")
public class ShopController {
  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
  public static final String branchName = Shop.class.getSimpleName();
  private JwtTokenUtil jwtTokenUtil;

  @Autowired public void JwtTokenUtil(JwtTokenUtil jwtTokenUtil) {
    this.jwtTokenUtil = jwtTokenUtil;
  }

  private ShopService shopService;

  @Autowired
  public void ShopService(ShopService shopService) {
    this.shopService = shopService;
  }

  private StatisticService statisticService;
  @Autowired public void StatisticService(StatisticService statisticService) {
    this.statisticService = statisticService;
  }

  @GetMapping
  public ResponseObject<List<ShopResponseDTO>> getAllShops(
      @RequestParam(name = "page", required = false, defaultValue = DEFAULT_PAGE) Integer page,
      @RequestParam(name = "limit", required = false, defaultValue = DEFAULT_SIZE) Integer size,
      @RequestParam(name = "sortField", required = false, defaultValue = "id") String sortField,
      @RequestParam(name = "sortDir", required = false, defaultValue = "asc") String sortDir,
      @RequestParam(name = "keyword", required = false, defaultValue = "") String keyword
  ) {
    Sort sort = Sort.by(sortField);
    sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();
    Pageable pageable = PageRequest.of(page > 0 ? page - 1 : 0, size, sort);
    return new ResponseObject<>(
        HttpStatus.OK, "", this.shopService.getAllShops(keyword));
  }

  @GetMapping("/{id}")
  public ResponseObject<ShopResponseDTO> getShopById(@PathVariable(name = "id") Integer id) {
    return new ResponseObject<>(HttpStatus.OK, "", this.shopService.getShopById(id));
  }

  @GetMapping("/slug/{slug}")
  public ResponseObject<ShopResponseDTO> getShopBySlug(@PathVariable(name = "slug") String slug) {
    return new ResponseObject<>(HttpStatus.OK, "", this.shopService.getShopBySlug(slug));
  }

  @GetMapping("/userId/{userId}")
  public ResponseObject<ShopResponseDTO> getShopByUser(@PathVariable(name = "userId") Integer userId) {
    return new ResponseObject<>(HttpStatus.OK, "", this.shopService.getShopByUser(userId));
  }

  @GetMapping("/access-token")
  @RolesAllowed({ERole.Names.CUSTOMER, ERole.Names.SELLER, ERole.Names.ADMIN})
  public ResponseObject<ShopResponseDTO> getShopByAccessToken(HttpServletRequest request) {
    String accessToken = jwtTokenUtil.getAccessToken(request);
    return new ResponseObject<>(HttpStatus.OK, "", this.shopService.getShopByAccessToken(accessToken));
  }

  @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
  @RolesAllowed({ERole.Names.CUSTOMER, ERole.Names.ADMIN})
  public ResponseObject<ShopResponseDTO> createShop(
      @RequestPart("data") @Valid ShopCreationDTO shopCreationDTO,
      @RequestParam(name = "isAdmin", required = false, defaultValue = "false")
      boolean isAdmin,
      @RequestPart(value = "avatar", required = false)
      MultipartFile avatarFile,
      @RequestPart(value = "background", required = false)
      MultipartFile backgroundFile,
      HttpServletRequest request
  ) {
    isAdmin = isAdmin ? isAdmin : SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString().contains(
        ERole.ROLE_ADMIN.toString());
    String loginKey = jwtTokenUtil.getUserNameFromRequest(request);
    return new ResponseObject<>(HttpStatus.CREATED, String.format(Utils.CREATE_OBJECT_SUCCESSFULLY, branchName),
                                this.shopService.createShop(loginKey,
                                                            shopCreationDTO,
                                                            avatarFile,
                                                            backgroundFile,
                                                            isAdmin));
  }

  @PutMapping("/{id}")
  @RolesAllowed({ERole.Names.SELLER, ERole.Names.ADMIN})
  public ResponseObject<ShopResponseDTO> updateShop(
      @PathVariable(name = "id") Integer id,
      @RequestParam(name = "isAdmin", required = false, defaultValue = "false")
      boolean isAdmin,
      @RequestPart("data") ShopCreationDTO shopCreationDTO,
      @RequestPart(value = "avatar", required = false)
      MultipartFile avatarFile,
      @RequestPart(value = "background", required = false)
      MultipartFile backgroundFile,
      HttpServletRequest request
  ) {
    isAdmin = isAdmin ? isAdmin : SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString().contains(
        ERole.ROLE_ADMIN.toString());
    String loginKey = jwtTokenUtil.getUserNameFromRequest(request);
    return new ResponseObject<>(HttpStatus.OK, String.format(Utils.UPDATE_OBJECT_SUCCESSFULLY, branchName),
                                this.shopService.updateShop(loginKey,
                                                            id,
                                                            shopCreationDTO,
                                                            avatarFile,
                                                            backgroundFile,
                                                            isAdmin));
  }

  @DeleteMapping("/{id}")
  @RolesAllowed({ERole.Names.SELLER, ERole.Names.ADMIN})
  public ResponseObject<ShopResponseDTO> deleteShop(
      @PathVariable(name = "id") Integer id,
      @RequestParam(name = "isAdmin", required = false, defaultValue = "false")
      boolean isAdmin,
      HttpServletRequest request
  ) {
    String loginKey = jwtTokenUtil.getUserNameFromRequest(request);
    return new ResponseObject<>(HttpStatus.OK, String.format(Utils.DELETE_OBJECT_SUCCESSFULLY, branchName),
                                this.shopService.deleteShopById(loginKey, id, isAdmin));
  }

  @GetMapping("/overview/{id}")
  public ResponseObject<ShopOverview> getOverviewShopById(@PathVariable(name = "id") Integer id) {
    return new ResponseObject<>(HttpStatus.OK, "", this.statisticService.getOverviewByShop(id));
  }
}
