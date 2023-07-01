package gt.electronic.ecommerce.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author minh phuong
 * @created 20/11/2022 - 8:22 PM
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentUrlResponseDTO {
  String payUrl;
  Date createDate;
  Date expireDate;
}
