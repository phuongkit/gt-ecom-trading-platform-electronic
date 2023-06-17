package gt.electronic.ecommerce.services.impls;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import gt.electronic.ecommerce.dto.request.RegisterShopPriceDTO;
import gt.electronic.ecommerce.dto.response.ShopResponseDTO;
import gt.electronic.ecommerce.entities.*;
import gt.electronic.ecommerce.exceptions.ResourceNotFoundException;
import gt.electronic.ecommerce.mapper.ShopMapper;
import gt.electronic.ecommerce.models.enums.EOrderStatus;
import gt.electronic.ecommerce.models.enums.EPaymentCategory;
import gt.electronic.ecommerce.repositories.*;
import gt.electronic.ecommerce.services.PaymentService;
import gt.electronic.ecommerce.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
    public static final String branchName = PaymentHistory.class.getSimpleName();
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

    private PaymentHistoryRepository paymentHistoryRepo;

    @Autowired
    public void PaymentHistoryRepository(PaymentHistoryRepository paymentHistoryRepo) {
        this.paymentHistoryRepo = paymentHistoryRepo;
    }

    private ShopMapper shopMapper;
    @Autowired public void ShopMapper(ShopMapper shopMapper) {
        this.shopMapper = shopMapper;
    }
    private ShopRepository shopRepo;

    @Autowired
    public void ShopRepository(ShopRepository shopRepo) {
        this.shopRepo = shopRepo;
    }

    private ShopPriceRepository shopPriceRepo;

    @Autowired
    public void ShopPriceRepository(ShopPriceRepository shopPriceRepo) {
        this.shopPriceRepo = shopPriceRepo;
    }

    @Override
    public void updatePaymentHistory(String paymentCode, Date payAt, boolean isSuccess) {
        Date currentDate = new Date();
        PaymentHistory paymentHistory =
                this.paymentHistoryRepo.findByPaymentCode(paymentCode)
                        .orElseThrow(() -> new NotFoundException(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                                               branchName
                                ,
                                                                               "paymentCode",
                                                                               paymentCode)));
        if (paymentHistory.getCategory() == EPaymentCategory.ORDER) {
            this.LOGGER.info(String.format(Utils.LOG_UPDATE_PAYMENT_HISTORY_ORDER,
                                           isSuccess ? Utils.SUCCESS : Utils.FAIL,
                                           paymentCode,
                                           paymentHistory.getEntityId(),
                                           paymentHistory.getType().toString(), payAt == null ? new Date() : payAt));
            List<Order> entityList = this.orderRepo.findAllByPaymentOrderCode(paymentCode);
            if (entityList.size() < 1) {
                throw new ResourceNotFoundException(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                                  branchName,
                                                                  "PaymentOrderCode",
                                                                  paymentCode));
            }
            Order order = entityList.get(0);
            if (isSuccess) {
                for (OrderShop orderShop : order.getOrderShops()) {
                    orderShop.setPayAt(payAt);
                    this.orderShopRepo.save(orderShop);
                }
                order.setStatus(EOrderStatus.ORDER_PENDING);
            }
            this.orderRepo.save(order);
        } else if (paymentHistory.getCategory() == EPaymentCategory.SHOP_PRICE) {
            // jsonString is of type java.lang.String
            JsonObject jsonObject = JsonParser.parseString(paymentHistory.getParameter()).getAsJsonObject();
            Long shopPriceId = Long.parseLong(String.valueOf(jsonObject.get("shopPriceId")));
            this.LOGGER.info(String.format(Utils.LOG_UPDATE_PAYMENT_HISTORY_SHOP_PRICE,
                                           isSuccess ? Utils.SUCCESS : Utils.FAIL,
                                           paymentCode,
                                           paymentHistory.getEntityId(),
                                           shopPriceId,
                                           paymentHistory.getType().toString(),
                                           payAt == null ? currentDate : payAt));
            if (isSuccess) {
                Shop shop = shopRepo.findById(paymentHistory.getEntityId())
                        .orElseThrow(() -> new NotFoundException(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                                               Shop.class.getSimpleName(),
                                                                               "Id",
                                                                               paymentHistory.getEntityId())));
                ShopPrice shopPrice = shopPriceRepo.findById(shopPriceId)
                        .orElseThrow(() -> new NotFoundException(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                                               ShopPrice.class.getSimpleName(),
                                                                               "Id",
                                                                               shopPriceId)));

                long rangeTime = shopPrice.getNumber() * shopPrice.getDateType().getTime();
                if (shop.getShopPrice() != null && (shop.getShopPrice().equals(shopPrice) ||
                        shop.getShopPrice().getPriceType() == shopPrice.getPriceType()) &&
                        shop.getEndPriceAt() != null && shop.getEndPriceAt().after(new Date())) {
                    shop.setEndPriceAt(new Date(shop.getEndPriceAt().getTime() + rangeTime));
                    if (!shop.getShopPrice().equals(shopPrice)) {
                        shop.setShopPrice(shopPrice);
                    }
                } else {
                    shop.setEndPriceAt(new Date(currentDate.getTime() + rangeTime));
                    shop.setShopPrice(shopPrice);
                }
                shop.setRegisterPriceAt(currentDate);
                shop.setEnabled(true);
                shopRepo.save(shop);
            }
        }
        paymentHistory.update(isSuccess, payAt);
        this.paymentHistoryRepo.save(paymentHistory);

    }

    @Override
    public ShopResponseDTO registerShopPrice(RegisterShopPriceDTO registerShopPriceDTO) {
        this.LOGGER.info("Register %s with shopId = %s and shopPriceId = %s",
                         ShopPrice.class.getSimpleName(),
                         registerShopPriceDTO.getShopId(),
                         registerShopPriceDTO.getShopPriceId());
        Date currentDate = new Date();
        Shop shop = shopRepo.findById(registerShopPriceDTO.getShopId())
                .orElseThrow(() -> new NotFoundException(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                                       Shop.class.getSimpleName(),
                                                                       "Id",
                                                                       registerShopPriceDTO.getShopId())));
        ShopPrice shopPrice = shopPriceRepo.findById(registerShopPriceDTO.getShopPriceId())
                .orElseThrow(() -> new NotFoundException(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                                       ShopPrice.class.getSimpleName(),
                                                                       "Id",
                                                                       registerShopPriceDTO.getShopPriceId())));

        long rangeTime = shopPrice.getNumber() * shopPrice.getDateType().getTime();
        if (shop.getShopPrice() != null && (shop.getShopPrice().equals(shopPrice) ||
                shop.getShopPrice().getPriceType() == shopPrice.getPriceType()) &&
                shop.getEndPriceAt() != null && shop.getEndPriceAt().after(new Date())) {
            shop.setEndPriceAt(new Date(shop.getEndPriceAt().getTime() + rangeTime));
            if (!shop.getShopPrice().equals(shopPrice)) {
                shop.setShopPrice(shopPrice);
            }
        } else {
            shop.setEndPriceAt(new Date(currentDate.getTime() + rangeTime));
            shop.setShopPrice(shopPrice);
        }
        shop.setRegisterPriceAt(currentDate);
        shop.setEnabled(true);
        System.out.println(rangeTime + ";\n" + shop.getRegisterPriceAt() + ";\n" + shop.getEndPriceAt());
        return shopMapper.shopToShopResponseDTO(shop);
//        return shopMapper.shopToShopResponseDTO(shopRepo.save(shop));
    }
}
