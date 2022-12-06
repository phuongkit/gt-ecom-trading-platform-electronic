package gt.electronic.ecommerce.services.impls;

import gt.electronic.ecommerce.entities.Shop;
import gt.electronic.ecommerce.exceptions.ResourceAlreadyExistsException;
import gt.electronic.ecommerce.models.clazzs.GroupOrderByDate;
import gt.electronic.ecommerce.models.clazzs.ShopOverview;
import gt.electronic.ecommerce.models.enums.ETimeDistance;
import gt.electronic.ecommerce.models.interfaces.IInfoRating;
import gt.electronic.ecommerce.repositories.FeedbackRepository;
import gt.electronic.ecommerce.repositories.ProductRepository;
import gt.electronic.ecommerce.repositories.ShopRepository;
import gt.electronic.ecommerce.services.StatisticService;
import gt.electronic.ecommerce.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

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
    for (IInfoRating infoRating: infoRatingList) {
      totalVote += infoRating.getTotalVote();
      avgStar += infoRating.getTotalVote() * infoRating.getStar();
    }
    avgStar = avgStar/totalVote.doubleValue();
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

    return null;
  }
}
