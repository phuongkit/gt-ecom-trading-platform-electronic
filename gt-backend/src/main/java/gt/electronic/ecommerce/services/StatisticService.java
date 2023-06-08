package gt.electronic.ecommerce.services;

import gt.electronic.ecommerce.models.clazzs.GroupOrderByDate;
import gt.electronic.ecommerce.models.clazzs.ShopOverview;
import gt.electronic.ecommerce.models.clazzs.ShopSentiment;
import gt.electronic.ecommerce.models.enums.ETimeDistance;

import java.util.Date;
import java.util.List;

/**
 * @author minh phuong
 * @created 03/12/2022 - 12:08 PM
 */
public interface StatisticService {
  ShopOverview getOverviewByShop(Long shopId);
  List<GroupOrderByDate> statisticOrderByShop(String loginKey, Long shopId, Date startDate, Date endDate, ETimeDistance timeDistance);
  ShopSentiment statisticSentimentByShop(String loginKey, Long shopId);

  ShopSentiment reportNegativeProductByShop(String loginKey, Long shopId);
}
