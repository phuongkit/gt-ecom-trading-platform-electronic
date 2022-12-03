package gt.electronic.ecommerce.services;

import gt.electronic.ecommerce.models.clazzs.ShopOverview;

/**
 * @author minh phuong
 * @created 03/12/2022 - 12:08 PM
 */
public interface StatisticService {
  ShopOverview getOverviewByShop(Integer shopId);
}
