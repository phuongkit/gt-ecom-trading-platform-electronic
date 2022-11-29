package gt.electronic.ecommerce.services.impls;

import gt.electronic.ecommerce.dto.request.DiscountCreationDTO;
import gt.electronic.ecommerce.dto.request.DiscountUpdateDTO;
import gt.electronic.ecommerce.dto.response.DiscountResponseDTO;
import gt.electronic.ecommerce.entities.Discount;
import gt.electronic.ecommerce.entities.Shop;
import gt.electronic.ecommerce.entities.User;
import gt.electronic.ecommerce.exceptions.InvalidFieldException;
import gt.electronic.ecommerce.exceptions.ResourceAlreadyExistsException;
import gt.electronic.ecommerce.exceptions.ResourceNotFound;
import gt.electronic.ecommerce.exceptions.UserNotPermissionException;
import gt.electronic.ecommerce.mapper.DiscountMapper;
import gt.electronic.ecommerce.repositories.DiscountRepository;
import gt.electronic.ecommerce.repositories.ShopRepository;
import gt.electronic.ecommerce.repositories.UserRepository;
import gt.electronic.ecommerce.services.DiscountService;
import gt.electronic.ecommerce.services.UserService;
import gt.electronic.ecommerce.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author minh phuong
 * @created 24/11/2022 - 3:52 PM
 */
@Service
@Transactional
public class DiscountServiceImpl implements DiscountService {
  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
  public static final String branchName = Discount.class.getSimpleName();

  private DiscountMapper discountMapper;

  @Autowired
  private void DiscountMapper(DiscountMapper discountMapper) {
    this.discountMapper = discountMapper;
  }

  private DiscountRepository discountRepo;

  @Autowired
  private void DiscountRepository(DiscountRepository discountRepo) {
    this.discountRepo = discountRepo;
  }

  private ShopRepository shopRepo;

  @Autowired public void ShopRepository(ShopRepository shopRepo) {
    this.shopRepo = shopRepo;
  }

  private UserRepository userRepo;

  @Autowired public void UserRepository(UserRepository userRepo) {
    this.userRepo = userRepo;
  }

  private UserService userService;

  @Autowired public void UserService(UserService userService) {
    this.userService = userService;
  }

  @Override public Page<DiscountResponseDTO> getAllDiscountByShop(Integer shopId, Pageable pageable) {
    this.LOGGER.info(String.format(Utils.LOG_GET_ALL_OBJECT_BY_FIELD, branchName, "ShopId", shopId));
    Shop shopFound = this.shopRepo.findById(shopId).orElseThrow(
        () ->
            new ResourceNotFound(
                String.format(
                    Utils.OBJECT_NOT_FOUND_BY_FIELD,
                    Shop.class.getSimpleName(),
                    "ID",
                    shopId)));
    Page<Discount> entityPage = this.discountRepo.findAllByShop(shopFound, pageable);
    return entityPage.map(entity -> this.discountMapper.discountToDiscountResponseDTO(entity));
  }

  @Override public Page<DiscountResponseDTO> searchDiscount(
      String name,
      Double percent,
      String code,
      Date startDate,
      Date endDate,
      Double fromPercent,
      Double toPercent,
      Date fromDate,
      Date toDate,
      Integer shopId,
      Pageable pageable
  ) {
    this.LOGGER.info(String.format(Utils.LOG_GET_ALL_OBJECT_BY_FIELD, branchName, "ShopId", shopId));
    Shop shopFound = this.shopRepo.findById(shopId).orElseThrow(
        () ->
            new ResourceNotFound(
                String.format(
                    Utils.OBJECT_NOT_FOUND_BY_FIELD,
                    Shop.class.getSimpleName(),
                    "ID",
                    shopId)));
    Page<Discount> discounts =
        this.discountRepo.search(
            name,
            percent,
            code,
            startDate,
            endDate,
            fromPercent,
            toPercent,
            fromDate,
            toDate,
            shopFound,
            pageable);
    return discounts.map(discount -> this.discountMapper.discountToDiscountResponseDTO(discount));
  }

  @Override public DiscountResponseDTO getDiscountById(Long id) {
    this.LOGGER.info(String.format(Utils.LOG_GET_OBJECT, branchName, "Id", id));
    Discount entity = this.discountRepo.findById(id).orElseThrow(
        () ->
            new ResourceNotFound(
                String.format(
                    Utils.OBJECT_NOT_FOUND_BY_FIELD,
                    Discount.class.getSimpleName(),
                    "Id",
                    id
                )));
    return this.discountMapper.discountToDiscountResponseDTO(entity);
  }

  @Override public DiscountResponseDTO checkDiscountByCode(String loginKey, String code) {
    this.LOGGER.info(String.format(Utils.LOG_GET_OBJECT + Utils.ADD_LOG_FOR_USER,
                                   branchName,
                                   "Code",
                                   code,
                                   "LoginKey",
                                   loginKey));
    List<Discount> entityList = this.discountRepo.checkDiscountByCode(code);
    if (entityList.size() < 1) {
      throw new ResourceNotFound(String.format(Utils.NOT_FOUND_OBJECT_VALID, branchName, "Code", code));
    }
    if (!Objects.equals(loginKey.trim(), "")) {
      try {
        User userFound = this.userService.getUserByLoginKey(loginKey);
        if (userFound != null && !userFound.getDiscounts().contains(entityList.get(0))) {
          userFound.addDiscount(entityList.get(0));
          this.userRepo.save(userFound);
          entityList.get(0).setQuantity(entityList.get(0).getQuantity());
          this.discountRepo.save(entityList.get(0));
        }
      } catch (Exception ignored) {

      }
    }
    return this.discountMapper.discountToDiscountResponseDTO(entityList.get(0));
  }

  @Override
  public DiscountResponseDTO createDiscount(String loginKey, DiscountCreationDTO creationDTO, MultipartFile imageFile) {
    this.LOGGER.info(String.format(Utils.LOG_CREATE_OBJECT + Utils.ADD_LOG_FOR_USER,
                                   branchName,
                                   "Code",
                                   creationDTO.getCode(), "LoginKey", loginKey));
    User userFound = this.userService.getUserByLoginKey(loginKey);
    Shop shopFound = userFound.getShop();
    if (shopFound == null) {
      throw new UserNotPermissionException();
    }
    Optional<Discount> duplicateEntity = this.discountRepo.findByCode(creationDTO.getCode());
    if (duplicateEntity.isPresent()) {
      throw new ResourceAlreadyExistsException(String.format(Utils.OBJECT_EXISTED_BY_FIELD,
                                                             branchName,
                                                             "Code",
                                                             creationDTO.getCode()));
    }
    if (creationDTO.getStartDate().after(creationDTO.getEndDate())) {
      throw new InvalidFieldException(String.format(Utils.INVALID_TWO_FIELD,
                                                    branchName,
                                                    "StartDate",
                                                    creationDTO.getStartDate(),
                                                    "EndDate",
                                                    creationDTO.getEndDate()));
    }
    Discount newEntity = new Discount();
    newEntity.setName(creationDTO.getName());
    newEntity.setDescription(creationDTO.getDescription());
    newEntity.setQuantity(creationDTO.getQuantity());
    newEntity.setPercent(creationDTO.getPercent());
    newEntity.setCode(creationDTO.getCode());
    newEntity.setCappedAt(creationDTO.getCappedAt());
    newEntity.setPrice(creationDTO.getPrice());
    newEntity.setMinSpend(creationDTO.getMinSpend());
    newEntity.setStartDate(creationDTO.getStartDate());
    newEntity.setEndDate(creationDTO.getEndDate());
    return this.discountMapper.discountToDiscountResponseDTO(this.discountRepo.save(newEntity));
  }

  @Override public DiscountResponseDTO updateDiscount(
      String loginKey,
      Long id,
      DiscountUpdateDTO updateDTO,
      MultipartFile imageFile
  ) {
    return null;
  }

  @Override public DiscountResponseDTO deleteDiscountById(String loginKey, Long id) {
    return null;
  }

  @Override public List<DiscountResponseDTO> getAllDiscountByUser(String loginKey, Pageable pageable) {
    this.LOGGER.info(String.format(Utils.LOG_GET_OBJECT, branchName,
                                   User.class.getSimpleName(),
//                                   "LoginKey",
                                   loginKey));
    User userFound = this.userService.getUserByLoginKey(loginKey);
    List<Discount> discounts = this.discountRepo.findAllByUser(userFound, pageable);
    return discounts.stream().map(discount -> this.discountMapper.discountToDiscountResponseDTO(discount)).collect(
        Collectors.toList());
  }

  @Override public List<DiscountResponseDTO> addAllDiscountToUser(String loginKey, List<String> discountCodes) {
    this.LOGGER.info(String.format(Utils.LOG_ADD_ALL_OBJECT_TO_OBJECT,
                                   "DiscountCode",
                                   discountCodes,
                                   User.class.getSimpleName(),
                                   "LoginKey",
                                   loginKey));
    User userFound = this.userService.getUserByLoginKey(loginKey);
    List<Discount> discounts = new ArrayList<>();
    for (String discountCode : discountCodes) {
      Discount discountFound = this.discountRepo.findByCode(discountCode).orElse(null);
      if (discountFound != null && !userFound.getDiscounts().contains(discountFound) && Utils.isAvailableDiscount(
          discountFound)) {
        discountFound.setQuantity(discountFound.getQuantity() - 1);
        userFound.addDiscount(discountFound);
        discounts.add(discountFound);
      }
    }
    this.userRepo.save(userFound);
    return discounts.stream().map(discount -> this.discountMapper.discountToDiscountResponseDTO(discount)).collect(
        Collectors.toList());
  }

  @Override public List<DiscountResponseDTO> removeAllDiscountFromUser(String loginKey, List<String> discountCodes) {
    this.LOGGER.info(String.format(Utils.LOG_REMOVE_ALL_OBJECT_FROM_OBJECT,
                                   "DiscountCode",
                                   discountCodes,
                                   User.class.getSimpleName(),
                                   "LoginKey",
                                   loginKey));
    User userFound = this.userService.getUserByLoginKey(loginKey);
    List<Discount> discounts = new ArrayList<>();
    for (String discountCode : discountCodes) {
      Discount discountFound = this.discountRepo.findByCode(discountCode).orElse(null);
      if (discountFound != null) {
        discountFound.setQuantity(discountFound.getQuantity() + 1);
        userFound.removeDiscount(discountFound);
        discounts.add(discountFound);
      }
    }
    this.discountRepo.saveAllAndFlush(discounts);
    this.userRepo.save(userFound);
    return discounts.stream().map(discount -> this.discountMapper.discountToDiscountResponseDTO(discount)).collect(
        Collectors.toList());
  }
}
