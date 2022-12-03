package gt.electronic.ecommerce.mapper.impls;

import gt.electronic.ecommerce.dto.request.CartDetailCreationDTO;
import gt.electronic.ecommerce.dto.request.OrderDetailCreationDTO;
import gt.electronic.ecommerce.dto.response.OrderDetailResponseDTO;
import gt.electronic.ecommerce.entities.*;
import gt.electronic.ecommerce.exceptions.ResourceNotFoundException;
import gt.electronic.ecommerce.exceptions.ResourceNotSufficientException;
import gt.electronic.ecommerce.exceptions.ResourceNotValidException;
import gt.electronic.ecommerce.mapper.OrderItemMapper;
import gt.electronic.ecommerce.mapper.ProductMapper;
import gt.electronic.ecommerce.mapper.UserMapper;
import gt.electronic.ecommerce.models.enums.EOrdertemStatus;
import gt.electronic.ecommerce.repositories.OrderItemRepository;
import gt.electronic.ecommerce.repositories.ProductRepository;
import gt.electronic.ecommerce.repositories.SaleRepository;
import gt.electronic.ecommerce.services.SaleService;
import gt.electronic.ecommerce.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author minh phuong
 * @created 20/09/2022 - 9:34 PM
 * @project gt-backend
 */
@Component
public class OrderItemMapperImpl implements OrderItemMapper {
  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
  private OrderItemRepository orderItemRepo;

  @Autowired public void OrderItemRepository(OrderItemRepository orderItemRepo) {
    this.orderItemRepo = orderItemRepo;
  }

  private ProductMapper productMapper;

  @Autowired public void ProductMapper(ProductMapper productMapper) {
    this.productMapper = productMapper;
  }

  private ProductRepository productRepo;

  @Autowired public void ProductRepository(ProductRepository productRepo) {
    this.productRepo = productRepo;
  }

  private SaleRepository saleRepo;

  @Autowired public void SaleRepository(SaleRepository saleRepo) {
    this.saleRepo = saleRepo;
  }

  private SaleService saleService;

  @Autowired
  public void SaleService(SaleService saleService) {
    this.saleService = saleService;
  }

  private UserMapper userMapper;

  @Autowired
  public void UserMapper(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  @Override public Set<OrderItem> orderDetailCreationDTOsToOrderItems(Order order,
                                                                      List<OrderDetailCreationDTO> creationDTOList) {
    if (order == null || creationDTOList == null || creationDTOList.size() < 1) {
      return null;
    }
    Set<OrderItem> orderItemSet = new HashSet<>();
    for (OrderDetailCreationDTO orderItemDTO : creationDTOList) {
      if (orderItemDTO.getProductId() != null) {
        OrderItem orderItem = new OrderItem();
        Product productFound = this.productRepo.findById(orderItemDTO.getProductId())
            .orElseThrow(() -> new ResourceNotFoundException(String.format(
                Utils.OBJECT_NOT_FOUND_BY_FIELD, Product.class.getSimpleName(), "ID", orderItemDTO.getProductId())));
        if (productFound.getQuantity() < orderItemDTO.getQuantity()) {
          throw new ResourceNotSufficientException(Utils.PRODUCT_NOT_ENOUGH);
        }
        Sale saleFound = null;
        if (orderItemDTO.getSaleName() != null && orderItemDTO.getSaleName().trim().length() > 1) {
          saleFound = this.saleRepo.findByName(orderItemDTO.getSaleName()).orElse(null);
          if (saleFound != null) {
            try {
              if (!Utils.checkValidDate(saleFound.getStartDate(), saleFound.getEndDate(), false)) {
                saleFound = null;
              }
            } catch (ResourceNotValidException e) {
              saleFound = null;
            }
          }
        }
        orderItem.setUser(order.getUser());
        orderItem.setOrder(order);
        orderItem.setProduct(productFound);
        orderItem.setSale(saleFound);
        orderItem.setQuantity(orderItemDTO.getQuantity());
        orderItem.setTotalPrice(Utils.getPriceProduct(productFound, saleFound, orderItemDTO.getQuantity()));
        // update product quantity;
        productFound.setQuantity(productFound.getQuantity() - orderItemDTO.getQuantity());
        orderItem.setNote(orderItemDTO.getNote());
        orderItem.setStatus(EOrdertemStatus.PAID);
        orderItemSet.add(orderItem);
      }
    }
    return orderItemSet;
  }

  @Override public Set<OrderItem> cartDetailCreationDTOsToOrderItems(User user,
                                                                     List<CartDetailCreationDTO> creationDTOList) {
    if (user == null || creationDTOList == null || creationDTOList.size() < 1) {
      return null;
    }
    Set<OrderItem> orderItemSet = new HashSet<>();
    for (CartDetailCreationDTO creationDTO : creationDTOList) {
      Product productFound = this.productRepo.findById(creationDTO.getProductId()).orElse(null);
      if (productFound != null) {
        OrderItem orderItemFound = this.orderItemRepo.findByUserAndProductAndStatus(user, productFound,
            EOrdertemStatus.UN_PAID).orElse(null);
        Long newQuantity = creationDTO.getQuantity();
        if (orderItemFound != null) {
          newQuantity = newQuantity + orderItemFound.getQuantity();
        } else {
          orderItemFound = new OrderItem();
          orderItemFound.setUser(user);
          orderItemFound.setProduct(productFound);
          orderItemFound.setStatus(EOrdertemStatus.UN_PAID);
        }
        newQuantity = newQuantity < productFound.getQuantity() ? newQuantity : productFound.getQuantity();
        Sale sale = this.saleService.getMostOptimalSaleByProduct(productFound.getId());
        orderItemFound.setSale(sale);
        orderItemFound.setQuantity(newQuantity);
        orderItemFound.setTotalPrice(Utils.getPriceProduct(productFound, sale, orderItemFound.getQuantity()));
        orderItemSet.add(orderItemFound);
      }
    }
    return orderItemSet;
  }

  @Override
  public OrderDetailResponseDTO orderItemToOrderDetailResponseDTO(OrderItem entity) {
    if (entity == null) {
      return null;
    }
    OrderDetailResponseDTO responseDTO = new OrderDetailResponseDTO();
    responseDTO.setId(entity.getId());
    if (entity.getProduct() != null) {
      responseDTO.setProduct(this.productMapper.productToProductGalleryDTO(entity.getProduct()));
    }
    if (entity.getSale() != null) {
      responseDTO.setSale(entity.getSale().getPercent());
    }
    responseDTO.setQuantity(entity.getQuantity());
    responseDTO.setTotalPrice(Utils.getPriceProduct(entity.getProduct(), entity.getSale(), responseDTO.getQuantity()));
    responseDTO.setNote(entity.getNote());
    return responseDTO;
  }
}
