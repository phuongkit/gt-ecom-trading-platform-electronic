package gt.electronic.ecommerce.dto.request;

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
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author minh phuong
 * @created 20/09/2022 - 9:13 PM
 * @project gt-backend
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderCreationDTO {
  private Integer userId;

//  @NotBlank(message = "Gender not blank!")
//  @NotNull(message = "Gender not null!")
  private EGender gender;

  @NotBlank(message = "FullName not blank!")
  @NotNull(message = "FullNane not null!")
  private String fullName;

//  @NotBlank(message = "Email not blank!")
  private String email;

  @NotBlank(message = "Phone not blank!")
  @NotNull(message = "Phone not null!")
  private String phone;

//  @NotBlank(message = "Address not blank!")
  @NotNull(message = "Address not null!")
  private AddressCreationDTO address;

  private EPayment payment;
  private EShippingMethod shippingMethod;
  private BigDecimal transportFee;
  private String discountCode;
  private boolean paid;
  private String note;

//  @NotBlank(message = "OrderItems not blank!")
  @NotNull(message = "OrderItems not null!")
  private List<OrderDetailCreationDTO> orderItems;

  public OrderCreationDTO(User user, List<OrderDetailCreationDTO> orderItems) {
    this.userId = user.getId();
    this.gender = user.getGender();
    this.fullName = Utils.getFullNameFromLastNameAndFirstName(user.getLastName(), user.getFirstName());
    this.email = user.getEmail();
    this.phone = user.getPhone();
    this.address = new AddressCreationDTO(user.getAddresses());
    this.payment = EPayment.CASH;
    this.shippingMethod = EShippingMethod.GHN_EXPRESS;
    this.paid = true;
    this.orderItems = orderItems;
  }
}
