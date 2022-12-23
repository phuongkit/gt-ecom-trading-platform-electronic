package gt.electronic.ecommerce.services.impls;

import gt.electronic.ecommerce.entities.OrderShop;
import gt.electronic.ecommerce.entities.Shop;
import gt.electronic.ecommerce.exceptions.ResourceAlreadyExistsException;
import gt.electronic.ecommerce.exceptions.ResourceNotFound;
import gt.electronic.ecommerce.models.clazzs.GroupOrderByDate;
import gt.electronic.ecommerce.models.clazzs.ShopOverview;
import gt.electronic.ecommerce.models.clazzs.SimpleOrder;
import gt.electronic.ecommerce.models.enums.ETimeDistance;
import gt.electronic.ecommerce.models.interfaces.IInfoRating;
import gt.electronic.ecommerce.repositories.FeedbackRepository;
import gt.electronic.ecommerce.repositories.OrderShopRepository;
import gt.electronic.ecommerce.repositories.ProductRepository;
import gt.electronic.ecommerce.repositories.ShopRepository;
import gt.electronic.ecommerce.services.StatisticService;
import gt.electronic.ecommerce.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

/**
 * @author minh phuong
 * @created 03/12/2022 - 12:08 PM
 */
@Service
@Transactional
public class StatisticServiceImpl implements StatisticService {
  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
  public static final String branchName = "Statistic";
  private FeedbackRepository feedbackRepo;

  @Autowired public void FeedbackRepository(FeedbackRepository feedbackRepo) {
    this.feedbackRepo = feedbackRepo;
  }

  private OrderShopRepository orderShopRepo;

  @Autowired public void OrderShopRepository(OrderShopRepository orderShopRepo) {
    this.orderShopRepo = orderShopRepo;
  }

  private ProductRepository productRepo;

  @Autowired public void ProductRepository(ProductRepository productRepo) {
    this.productRepo = productRepo;
  }

  private ShopRepository shopRepo;

  @Autowired public void ShopRepository(ShopRepository shopRepo) {
    this.shopRepo = shopRepo;
  }

  @Override public ShopOverview getOverviewByShop(Integer shopId) {
    this.LOGGER.info(String.format(Utils.LOG_GET_OBJECT, branchName + " Overview Shop", "ShopId", shopId));
    // check shop name is existed
    Shop shopFound = this.shopRepo.findById(shopId).orElseThrow(() ->
                                                                    new ResourceAlreadyExistsException(
                                                                        String.format(
                                                                            Utils.OBJECT_EXISTED_BY_FIELD,
                                                                            Shop.class.getSimpleName(),
                                                                            "Id",
                                                                            shopId)));
    ShopOverview shopOverview = new ShopOverview();
    shopOverview.setTotalProduct(this.productRepo.countAllByShop(shopFound));
    List<IInfoRating> infoRatingList = this.feedbackRepo.getAllInfoRatingByShop(shopFound);
    Long totalVote = 0L;
    double avgStar = 0d;
    for (IInfoRating infoRating : infoRatingList) {
      totalVote += infoRating.getTotalVote();
      avgStar += infoRating.getTotalVote() * infoRating.getStar();
    }
    avgStar = avgStar / totalVote.doubleValue();
    shopOverview.setTotalVote(totalVote);
    shopOverview.setAvgStar(Utils.toBeTruncatedDouble(avgStar));
    shopOverview.setTimeDistanceFromCreateAt(Utils.getTimeDistance(shopFound.getCreatedAt(), null).timeDistance);
    return shopOverview;
  }

  @Override public List<GroupOrderByDate> statisticOrderByShop(
      String loginKey,
      Integer shopId,
      Date startDate,
      Date endDate,
      ETimeDistance timeDistance
  ) {

    Shop shopFound = this.shopRepo.findById(shopId)
        .orElseThrow(() -> new ResourceNotFound(String.format(Utils.OBJECT_NOT_FOUND_BY_FIELD,
                                                              Shop.class.getSimpleName(),
                                                              "ID",
                                                              shopId)));
    List<OrderShop> orderList = this.orderShopRepo.findAllByShopAndRangePayDate(shopFound, startDate, endDate);
    Map<String, List<OrderShop>> groupOrderByDate = new HashMap<>();
    for (OrderShop order : orderList) {
      Calendar calendar = Utils.dateToCalendar(order.getCreatedAt());
      calendar.set(Calendar.HOUR_OF_DAY, 0);
      if (timeDistance == ETimeDistance.MONTH) {
        calendar.set(Calendar.DAY_OF_MONTH, 0);
      }
      String keyDate = Utils.getStringFromCalendar(calendar, timeDistance);
      List<OrderShop> orderByDays = groupOrderByDate.get(keyDate);
      if (orderByDays == null || orderByDays.size() == 0) {
        groupOrderByDate.put(keyDate, new ArrayList<>(Collections.singleton(order)));
      } else {
        orderByDays.add(order);
        groupOrderByDate.put(keyDate, orderByDays);
      }
    }
    List<GroupOrderByDate> groupOrderByDates = new ArrayList<>();
    for (Map.Entry<String, List<OrderShop>> entry : groupOrderByDate.entrySet()) {
      GroupOrderByDate groupOrder = new GroupOrderByDate();
      groupOrder.setDateStatistic(entry.getKey());
      BigDecimal totalPrice = new BigDecimal(0);
      List<SimpleOrder> orderDetails = new ArrayList<>();
      for (OrderShop order : entry.getValue()) {
        totalPrice = totalPrice.add(order.getTotalPrice());
        SimpleOrder simpleOrder = new SimpleOrder(order.getId(),
                                                  order.getTotalPrice(),
                                                  order.getTotalFee(),
                                                  new BigDecimal(0),
                                                  order.getTotalPrice());
        orderDetails.add(simpleOrder);
      }
      groupOrder.setTotalPrice(totalPrice);
      groupOrder.setOrderDetails(orderDetails);
      groupOrderByDates.add(groupOrder);
    }
    return groupOrderByDates;
  }
}
