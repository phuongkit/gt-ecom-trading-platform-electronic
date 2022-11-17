package gt.electronic.ecommerce.dto.response;

import gt.electronic.ecommerce.dto.request.AddressCreationDTO;
import gt.electronic.ecommerce.entities.*;
import gt.electronic.ecommerce.models.enums.EGender;
import gt.electronic.ecommerce.models.enums.EOrderStatus;
import gt.electronic.ecommerce.models.enums.EPayment;
import gt.electronic.ecommerce.models.enums.EShippingMethod;
import gt.electronic.ecommerce.utils.Utils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;

/**
 * @author minh phuong
 * @created 20/09/2022 - 9:27 PM
 * @project gt-backend
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {
  private Long id;
  private UserSimpleResponseDTO user;
  private int gender;
  private String fullName;
  private String email;
  private String phone;
  private AddressResponseDTO address;
  private BigDecimal totalPrice;
  private int payment;
  private int shippingMethod;
  private BigDecimal transportFee;
  private DiscountResponseDTO discount;
  private EOrderStatus status;
  private Date payAt;
  private String note;
  private OrderDetailResponseDTO[] orderItems;
  private Date createdAt;
  private Date updatedAt;
}
