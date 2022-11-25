package gt.electronic.ecommerce.services;

import gt.electronic.ecommerce.entities.Location;

/**
 * @author minh phuong
 * @created 26/09/2022 - 3:27 PM
 */
public interface LocationService {
  Location getLocation(Location location);
  Location saveLocation(Location location);
}
