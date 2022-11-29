package gt.electronic.ecommerce.services.impls;

import gt.electronic.ecommerce.dto.request.OrderCreationDTO;
import gt.electronic.ecommerce.dto.request.OrderUpdatePaymentDTO;
import gt.electronic.ecommerce.dto.request.OrderUpdateStatusDTO;
import gt.electronic.ecommerce.dto.response.OrderResponseDTO;
import gt.electronic.ecommerce.entities.*;
import gt.electronic.ecommerce.exceptions.ResourceNotFound;
import gt.electronic.ecommerce.exceptions.ResourceNotFoundException;
import gt.electronic.ecommerce.exceptions.UserNotPermissionException;
import gt.electronic.ecommerce.mapper.LocationMapper;
import gt.electronic.ecommerce.mapper.OrderItemMapper;
import gt.electronic.ecommerce.mapper.OrderMapper;
import gt.electronic.ecommerce.models.enums.EGender;
import gt.electronic.ecommerce.models.enums.EOrderStatus;
import gt.electronic.ecommerce.models.enums.EPayment;
import gt.electronic.ecommerce.models.enums.ERole;
import gt.electronic.ecommerce.repositories.*;
import gt.electronic.ecommerce.services.*;
import gt.electronic.ecommerce.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author minh phuong
 * @created 11/09/2022 - 10:04 AM
 */
@Service @Transactional public class OrderServiceImpl implements OrderService {
  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
  public static final String branchName = Order.class.getSimpleName();
  private DiscountRepository discountRepo;

  @Autowired public void DiscountRepository(DiscountRepository discountRepo) {
    this.discountRepo = discountRepo;
  }

  private GHNService ghnService;

  @Autowired public void GHNService(GHNService ghnService) {
    this.ghnService = ghnService;
  }

  private LocationMapper locationMapper;

  @Autowired public void LocationMapper(LocationMapper locationMapper) {
    this.locationMapper = locationMapper;
  }

  private LocationService locationService;

  @Autowired public void LocationService(LocationService locationService) {
    this.locationService = locationService;
  }

  private OrderItemMapper orderItemMapper;

  @Autowired public void OrderItemMapper(OrderItemMapper orderItemMapper) {
    this.orderItemMapper = orderItemMapper;
  }

  private OrderItemService orderItemService;

  @Autowired public void OrderItemService(OrderItemService orderItemService) {
    this.orderItemService = orderItemService;
  }

  private OrderMapper orderMapper;

  @Autowired public void OrderMapper(OrderMapper orderMapper) {
    this.orderMapper = orderMapper;
  }

  private OrderRepository orderRepo;

  @Autowired public void OrderRepository(OrderRepository orderRepo) {
    this.orderRepo = orderRepo;
  }

  private PaymentRepository paymentRepo;

  @Autowired public void PaymentRepository(PaymentRepository paymentRepo) {
    this.paymentRepo = paymentRepo;
  }

  private ProductRepository productRepo;

  @Autowired public void ProductRepository(ProductRepository productRepo) {
    this.productRepo = productRepo;
  }

  private ShippingMethodRepository shippingMethodRepo;

  @Autowired public void ShippingMethodRepository(ShippingMethodRepository shippingMethodRepo) {
    this.shippingMethodRepo = shippingMethodRepo;
  }

  private ShopRepository shopRepo;

  @Autowired public void ShopRepository(ShopRepository shopRepo) {
    this.shopRepo = shopRepo;
  }

  private UserService userService;

  @Autowired public void UserService(UserService userService) {
    this.userService = userService;
  }

  @Override public Page<OrderResponseDTO> getAllOrders(Pageable pageable) {
    this.LOGGER.info(String.format(Utils.LOG_GET_ALL_OBJECT, branchName));
    Page<Order> orderPage = this.orderRepo.findAll(pageable);
    return orderPage.map(order -> this.orderMapper.orderToOrderResponseDTO(order, null));
  }

  @Override public Page<OrderResponseDTO> getAllOrdersByUser(String loginKey, Integer userId, Pageable pageable) {
    this.LOGGER.info(String.format(Utils.LOG_GET_ALL_OBJECT_BY_FIELD + Utils.ADD_LOG_FOR_USER,
                                   branchName,
                                   "User",
                                   userId,
                                   "LoginKey",
                                   loginKey));
    User userFound = this.userService.getUserByLoginKey(loginKey);
    Page<Order> orderPage = this.orderRepo.findAllByUser(userFound, pageable);
    return orderPage.map(order -> this.orderMapper.orderToOrderResponseDTO(order, null));
  }

  @Override public Page<OrderResponseDTO> getAllOrdersByShop(
      String loginKey, Integer shopId, Pageable pageable, boolean... isAdmin
  ) {
    this.LOGGER.info(String.format(Utils.LOG_GET_OBJECT + Utils.ADD_LOG_FOR_USER,
                                   branchName,
                                   "ShopId",
                                   shopId,
                                   "LoginKey",
                                   loginKey));
    Shop shopFound;
    if (isAdmin.length > 0 && isAdmin[0]) {
      shopFound = this.shopRepo.findById(shopId)
          .orElseThrow(() -> new ResourceNotFound(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                                Shop.class.getSimpleName(),
                                                                "ID",
                                                                shopId)));
    } else {
      User userFound = this.userService.getUserByLoginKey(loginKey);
      shopFound = this.shopRepo.findByUser(userFound)
          .orElseThrow(() -> new ResourceNotFound(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                                Shop.class.getSimpleName(),
                                                                "User",
                                                                userFound.getUsername())));
      if (!Objects.equals(shopFound.getId(), shopId)) {
        throw new UserNotPermissionException();
      }
    }
    Page<Order> orderPage = this.orderRepo.findAllByShop(shopFound, pageable);
    return orderPage.map(order -> this.orderMapper.orderToOrderResponseDTO(order, shopFound.getId()));
  }

  @Override public OrderResponseDTO getOrderById(String loginKey, Long id) {
    this.LOGGER.info(String.format(Utils.LOG_GET_OBJECT + Utils.ADD_LOG_FOR_USER,
                                   branchName,
                                   "ID",
                                   id,
                                   "LoginKey",
                                   loginKey));
    User userFound = this.userService.getUserByLoginKey(loginKey);
    Order orderFound = this.orderRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                                       branchName,
                                                                       "ID",
                                                                       id)));
    return this.orderMapper.orderToOrderResponseDTO(orderFound, null, true);
  }

  @Override public OrderResponseDTO createOrder(String loginKey, OrderCreationDTO creationDTO) {
    this.LOGGER.info(String.format(Utils.LOG_CREATE_OBJECT + Utils.ADD_LOG_FOR_USER,
                                   branchName,
                                   User.class.getSimpleName() + "ID",
                                   creationDTO.getUserId(),
                                   "LoginKey",
                                   loginKey));
    User userFound = this.userService.getUserByLoginKey(loginKey);
    Order newEntity = new Order();
    newEntity.setUser(userFound);
    newEntity.setGender(creationDTO.getGender() == null ? EGender.UNKNOWN : creationDTO.getGender());
    newEntity.setFullName(creationDTO.getFullName());
    newEntity.setEmail(creationDTO.getEmail().length() < 1 ? null : creationDTO.getEmail());
    newEntity.setPhone(creationDTO.getPhone());
    // set address
    newEntity.setLine(creationDTO.getAddress().getHomeAdd());
    Location location = locationMapper.AddressCreationDTOToLocation(creationDTO.getAddress());
    newEntity.setLocation(this.locationService.saveLocation(location));
    // set payment
    Payment paymentFound = this.paymentRepo.findByName(creationDTO.getPayment())
        .orElseThrow(() -> new ResourceNotFoundException(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                                       Payment.class.getSimpleName(),
                                                                       "Name",
                                                                       creationDTO.getPayment())));
    newEntity.setPayment(paymentFound);
    // set shipping method
    ShippingMethod shippingMethodFound = this.shippingMethodRepo.findByName(creationDTO.getShippingMethod())
        .orElseThrow(() -> new ResourceNotFoundException(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                                       ShippingMethod.class.getSimpleName(),
                                                                       "Name",
                                                                       creationDTO.getShippingMethod())));
    newEntity.setShippingMethod(shippingMethodFound);
    // set expectedDeliveryTime
    newEntity.setExpectedDeliveryTime(creationDTO.getExpectedDeliveryTime());

    // initial total price product
    newEntity.setTotalPriceProduct(new BigDecimal(0));
    // initital total price disocunt
    newEntity.setTotalPriceDiscount(new BigDecimal(0));
    // set transportFee
    if (creationDTO.getTransportFee() != null) {
      newEntity.setTransportFee(creationDTO.getTransportFee());
    } else {
      newEntity.setTransportFee(new BigDecimal(0));
    }
    // initial total price
    newEntity.setTotalPrice(new BigDecimal(0));
    // initial status
    newEntity.setStatus(creationDTO.getStatus() == null ?
                            (creationDTO.getPayment().ordinal() > 0 ? EOrderStatus.ORDER_AWAITING_PAYMENT :
                                EOrderStatus.ORDER_PENDING) : creationDTO.getStatus());
    newEntity.setNote(creationDTO.getNote());

    Order savedEntity = this.orderRepo.save(newEntity);

    // set order item
    savedEntity.setOrderItemSet(this.orderItemMapper.orderDetailCreationDTOsToOrderItems(savedEntity,
                                                                                         creationDTO.getOrderItems()));
    savedEntity.setTotalPriceProduct(Utils.getTotalPriceFromOrderItems(savedEntity.getOrderItemSet(), null));
    // set discount
    if (creationDTO.getDiscountIds() != null && creationDTO.getDiscountIds().length > 0) {
      Set<Discount> discounts = new HashSet<>();
      for (Long discountId : creationDTO.getDiscountIds()) {
        Discount discountFound = this.discountRepo.findById(discountId).orElse(null);
        try {
          if (discountFound != null && Utils.checkValidDiscount(discountFound)) {
            discounts.add(discountFound);
            userFound.removeDiscount(discountFound);
          }
        } catch (Exception ignored) {

        }
      }
      Map<Shop, List<OrderItem>> orderItemGroupByShop = new HashMap<>();
      for (OrderItem orderItem : savedEntity.getOrderItemSet()) {
        List<OrderItem> orderItemList = orderItemGroupByShop.get(orderItem.getProduct().getShop());
        if (orderItemList == null) {
          orderItemGroupByShop.putIfAbsent(orderItem.getProduct().getShop(), Collections.singletonList(orderItem));
        } else {
          orderItemGroupByShop.compute(orderItem.getProduct().getShop(),
                                       (shop, orderItems) -> orderItems == null ? Collections.singletonList(orderItem) :
                                           Stream.concat(orderItems.stream(), Stream.of(orderItem))
                                               .collect(Collectors.toList()));
        }
      }
      discounts = discounts.stream().filter(discount -> orderItemGroupByShop.containsKey(discount.getShop()))
          .collect(Collectors.toSet());
      savedEntity.setDiscounts(discounts);
      BigDecimal totalPriceDiscount = new BigDecimal(0);
      for (Discount discount : discounts) {
        List<OrderItem> orderItems = orderItemGroupByShop.get(discount.getShop());
        switch (discount.getType()) {
          case DISCOUNT_SHOP_PRICE:
            if (discount.getMinSpend() != null) {
              BigDecimal totalPriceProduct =
                  orderItems.stream().map(OrderItem::getTotalPrice).reduce(new BigDecimal(0), BigDecimal::add);
              if (totalPriceProduct.compareTo(discount.getMinSpend()) < 0) {
                break;
              }
            }
            totalPriceDiscount = totalPriceDiscount.add(discount.getPrice());
            break;
          case DISCOUNT_SHOP_PERCENT:
            BigDecimal totalPriceProduct =
                orderItems.stream().map(OrderItem::getTotalPrice).reduce(new BigDecimal(0), BigDecimal::add);
            BigDecimal finalPriceDiscount = totalPriceProduct.multiply(BigDecimal.valueOf(discount.getPercent()));
            finalPriceDiscount = discount.getMinSpend() == null ? finalPriceDiscount :
                (finalPriceDiscount.compareTo(discount.getMinSpend()) < 1 ? finalPriceDiscount :
                    discount.getMinSpend());
            totalPriceDiscount = totalPriceDiscount.add(finalPriceDiscount);
            break;
          case DISCOUNT_BILL_PRICE:
            break;
          case DISCOUNT_BILL_PERCENT:
            break;
          default:
            break;
        }
      }
      savedEntity.setTotalPriceDiscount(totalPriceDiscount);
    }
    savedEntity.setTotalPrice(savedEntity.getTotalPriceProduct().subtract(savedEntity.getTotalPriceDiscount())
                                  .add(savedEntity.getTransportFee()));
    return this.orderMapper.orderToOrderResponseDTO(this.orderRepo.save(savedEntity), null, true);
  }

  @Override public OrderResponseDTO updateOrder(String loginKey, Long id, OrderCreationDTO creationDTO) {
    this.LOGGER.info(String.format(Utils.LOG_UPDATE_OBJECT + Utils.ADD_LOG_FOR_USER,
                                   branchName,
                                   User.class.getSimpleName() + "ID",
                                   creationDTO.getUserId(),
                                   "LoginKey",
                                   loginKey));
    User userFound = this.userService.getUserByLoginKey(loginKey);
    Order entityFound = this.orderRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                                       branchName,
                                                                       "ID",
                                                                       id)));


    return this.orderMapper.orderToOrderResponseDTO(this.orderRepo.save(entityFound), null, true);
  }

  @Override public OrderResponseDTO updatePaymentOrder(
      String loginKey, Long id, OrderUpdatePaymentDTO updatePaymentDTO
  ) {
    this.LOGGER.info(String.format(Utils.LOG_UPDATE_OBJECT + Utils.ADD_LOG_FOR_USER,
                                   branchName,
                                   "Payment",
                                   updatePaymentDTO.getPayment(),
                                   "LoginKey",
                                   loginKey));
    User userFound = this.userService.getUserByLoginKey(loginKey);
    Order entityFound = this.orderRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                                       branchName,
                                                                       "ID",
                                                                       id)));
    if (entityFound.getUser() == null || Objects.equals(userFound.getId(),
                                                        entityFound.getUser().getId()) || userFound.getRole()
        .getName() == ERole.ROLE_ADMIN) {
      Payment paymentFound = this.paymentRepo.findByName(
          updatePaymentDTO.getPayment() != null ? updatePaymentDTO.getPayment() : EPayment.CASH).orElse(null);
      entityFound.setPayment(paymentFound);
      entityFound.setStatus(updatePaymentDTO.getStatus() == null ?
                                (updatePaymentDTO.getPayment().ordinal() > 0 ? EOrderStatus.ORDER_AWAITING_PAYMENT :
                                    updatePaymentDTO.getStatus()) : updatePaymentDTO.getStatus());
      if (updatePaymentDTO.getExpectedDeliveryTime() != null) {
        entityFound.setExpectedDeliveryTime(updatePaymentDTO.getExpectedDeliveryTime());
      }
      if (updatePaymentDTO.getTransportFee() != null) {
        entityFound.setTransportFee(updatePaymentDTO.getTransportFee());
      }
      return this.orderMapper.orderToOrderResponseDTO(this.orderRepo.save(entityFound), null, true);
    } else {
      throw new UserNotPermissionException(Utils.USER_NOT_PERMISSION);
    }
  }

  @Override public OrderResponseDTO updateStatusOrder(
      String loginKey, Long id, OrderUpdateStatusDTO updateStatusDTO
  ) {
    this.LOGGER.info(String.format(Utils.LOG_UPDATE_OBJECT_BY_TWO_FIELD + Utils.ADD_LOG_FOR_USER,
                                   branchName,
                                   "Id",
                                   id,
                                   "Status",
                                   updateStatusDTO.getStatus(),
                                   "LoginKey",
                                   loginKey));
    User userFound = this.userService.getUserByLoginKey(loginKey);
    Order entityFound = this.orderRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                                       branchName,
                                                                       "ID",
                                                                       id)));
    if (entityFound.getUser() == null || Objects.equals(userFound.getId(),
                                                        entityFound.getUser().getId()) || userFound.getRole()
        .getName() == ERole.ROLE_ADMIN) {
      entityFound.setStatus(updateStatusDTO.getStatus());
      if (updateStatusDTO.getLog() != null && !Objects.equals(updateStatusDTO.getLog().trim(), "")) {
        entityFound.setLog(updateStatusDTO.getLog());
      }
      if (updateStatusDTO.getShipOrderCode() != null && !Objects.equals(updateStatusDTO.getShipOrderCode().trim(),
                                                                        "")) {
        entityFound.setShipOrderCode(updateStatusDTO.getShipOrderCode());
      }
      if (updateStatusDTO.getExpectedDeliveryTime() != null) {
        entityFound.setExpectedDeliveryTime(updateStatusDTO.getExpectedDeliveryTime());
      }
      if (updateStatusDTO.getTransportFee() != null) {
        entityFound.setTransportFee(updateStatusDTO.getTransportFee());
      }
      return this.orderMapper.orderToOrderResponseDTO(this.orderRepo.save(entityFound), null, true);
    } else {
      throw new UserNotPermissionException(Utils.USER_NOT_PERMISSION);
    }
  }

  @Override public void updatePostPaymentOrder(String payString, String paymentOrderCode, boolean success) {
    this.LOGGER.info(String.format(Utils.LOG_UPDATE_OBJECT_BY_TWO_FIELD,
                                   branchName,
                                   "PaymentOrderCode",
                                   paymentOrderCode,
                                   "Sucess",
                                   success));
    List<Order> entityList = this.orderRepo.findAllByPaymentOrderCode(paymentOrderCode);
    if (entityList.size() < 1) {
      throw new ResourceNotFoundException(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                        branchName,
                                                        "PaymentOrderCode",
                                                        paymentOrderCode));
    }
    Order order = entityList.get(0);
    if (success) {
      try {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        Date payAt = sdf.parse(payString);
        order.setPayAt(payAt);
      } catch (ParseException e) {
        order.setPayAt(new Date());
      }
      order.setStatus(EOrderStatus.ORDER_PENDING);
    }
    this.orderRepo.save(order);
  }

  @Override public OrderResponseDTO deleteOrderById(String loginKey, Long id) {
    this.LOGGER.info(String.format(Utils.LOG_DELETE_OBJECT + Utils.ADD_LOG_FOR_USER,
                                   branchName,
                                   "ID",
                                   id,
                                   "LoginKey",
                                   loginKey));
    User userFound = this.userService.getUserByLoginKey(loginKey);
    Order entityFound = this.orderRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                                       branchName,
                                                                       "ID",
                                                                       id)));

    if (userFound.getRole().getName() == ERole.ROLE_ADMIN || Objects.equals(userFound.getId(),
                                                                            entityFound.getUser().getId())) {

      for (OrderItem orderItem : entityFound.getOrderItemSet()) {
        this.orderItemService.deleteOrderItem(orderItem);
      }

      // delete order
      this.orderRepo.deleteById(id);

      return null;
    } else {
      throw new UserNotPermissionException(Utils.USER_NOT_PERMISSION);
    }
  }
}
