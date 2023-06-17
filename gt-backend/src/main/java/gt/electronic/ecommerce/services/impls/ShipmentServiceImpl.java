package gt.electronic.ecommerce.services.impls;

import gt.electronic.ecommerce.dto.response.OrderResponseDTO;
import gt.electronic.ecommerce.dto.response.ShipmentResponseDTO;
import gt.electronic.ecommerce.entities.*;
import gt.electronic.ecommerce.exceptions.UserNotPermissionException;
import gt.electronic.ecommerce.mapper.OrderMapper;
import gt.electronic.ecommerce.mapper.ShipmentMapper;
import gt.electronic.ecommerce.models.enums.EOrderStatus;
import gt.electronic.ecommerce.models.enums.ERole;
import gt.electronic.ecommerce.repositories.OrderRepository;
import gt.electronic.ecommerce.repositories.OrderShopRepository;
import gt.electronic.ecommerce.repositories.ShipmentRepository;
import gt.electronic.ecommerce.services.ShipmentService;
import gt.electronic.ecommerce.services.UserService;
import gt.electronic.ecommerce.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ShipmentServiceImpl implements ShipmentService {
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
    public static final String branchName = "Shipment";
    private OrderMapper orderMapper;

    @Autowired
    public void OrderMapper(OrderMapper orderMapper) {
        this.orderMapper = orderMapper;
    }

    private OrderRepository orderRepo;

    @Autowired
    public void OrderRepository(OrderRepository orderRepo) {
        this.orderRepo = orderRepo;
    }

    private OrderShopRepository orderShopRepo;

    @Autowired
    public void OrderShopRepository(OrderShopRepository orderShopRepo) {
        this.orderShopRepo = orderShopRepo;
    }

    private ShipmentMapper shipmentMapper;

    @Autowired
    public void ShipmentMapper(ShipmentMapper shipmentMapper) {
        this.shipmentMapper = shipmentMapper;
    }

    private ShipmentRepository shipmentRepo;

    @Autowired
    public void ShipmentRepository(ShipmentRepository shipmentRepo) {
        this.shipmentRepo = shipmentRepo;
    }

    private UserService userService;

    @Autowired
    public void UserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public Page<OrderResponseDTO> getAllOrdersSameAre(String loginKey, Pageable pageable) {
        this.LOGGER.info(String.format(Utils.LOG_GET_ALL_OBJECT_BY_USER,
                                       Order.class.getSimpleName(),
                                       branchName,
                                       loginKey));
        User author = userService.getUserByLoginKey(loginKey);
        if (author.getRole() == ERole.ROLE_SHIPPER && author.getAddresses().stream().findFirst().isPresent()) {
            Location location = author.getAddresses().stream().findFirst().get().getLocation();
            Page<OrderShop> page = this.orderRepo.getAllOrderByShipperArea(location.getCommune(),
                                                                           location.getDistrict(),
                                                                           location.getProvince(),
                                                                           pageable);
            return page.map(orderShop -> this.orderMapper.orderShopToOrderResponseDTO(orderShop, null, true));
        } else {
            throw new UserNotPermissionException();
        }
    }

    @Override
    public List<ShipmentResponseDTO> receiveOrderShipments(String loginKey, List<Long> orderShipmentIds) {
        this.LOGGER.info(String.format(Utils.LOG_RECEIVE_ORDER_SHIPMENTS_BY_SHIPPER,
                                       "[" + String.join(",",
                                                         orderShipmentIds.stream().map(String::valueOf).toList()) + "]",
//                                       orderShipmentIds.stream().collect(Collectors.joining(",")),
                                       loginKey));
        User author = userService.getUserByLoginKey(loginKey);
        if (author.getRole() == ERole.ROLE_SHIPPER && author.getAddresses().stream().findFirst().isPresent()) {
            List<OrderShop> orderShops = new ArrayList<>();
            List<Long> failedReceive = new ArrayList<>();
            for (Long orderShipmentId : orderShipmentIds) {
                OrderShop orderShop = this.orderShopRepo.findById(orderShipmentId)
                        .orElseThrow(() -> new NotFoundException(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                                               OrderShop.class.getSimpleName(),
                                                                               "Id",
                                                                               orderShipmentId)));
                if (orderShop.getStatus() == EOrderStatus.ORDER_AWAITING_SHIPMENT) {
//                if (orderShop.getStatus() == EOrderStatus.ORDER_PENDING) {
                    orderShops.add(orderShop);
                } else {
                    failedReceive.add(orderShipmentId);
                }
            }
            List<Shipment> shipments = new ArrayList<>();
            for (OrderShop orderShop : orderShops) {
                Shipment shipment = new Shipment(author, orderShop);
                shipment = this.shipmentRepo.save(shipment);
                orderShop.setShipOrderCode(shipment.getId());
//                this.orderShopRepo.save(orderShop);
                shipments.add(shipment);
            }
            List<ShipmentResponseDTO> response =
                    shipments.stream().map(shipment -> this.shipmentMapper.shipmentToShipmentResponseDTO(shipment))
                            .toList();
            for (ShipmentResponseDTO responseDTO : response) {
            }
            return response;
        } else {
            throw new UserNotPermissionException();
        }
    }
}
