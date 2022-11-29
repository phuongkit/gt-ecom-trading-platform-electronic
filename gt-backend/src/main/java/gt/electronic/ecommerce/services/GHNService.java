package gt.electronic.ecommerce.services;

import gt.electronic.ecommerce.entities.Order;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.ProtocolException;
import java.util.List;
import java.util.Map;

/**
 * @author minh phuong
 * @created 20/11/2022 - 10:03 PM
 */
public interface GHNService {
  Map<String, Object> getInfoShippingFee(Order order) throws IOException;
}