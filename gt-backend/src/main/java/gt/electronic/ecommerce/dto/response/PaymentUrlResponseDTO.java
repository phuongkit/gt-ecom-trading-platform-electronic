package gt.electronic.ecommerce.dto.response;

import lombok.Data;

import java.util.Date;

/**
 * @author minh phuong
 * @created 20/11/2022 - 8:22 PM
 */
@Data
public class PaymentUrlResponseDTO {
  String payUrl;
  Date createDate;
  Date expireDate;
}
