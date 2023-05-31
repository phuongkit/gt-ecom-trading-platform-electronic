package gt.electronic.ecommerce.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

/**
 * @author minh phuong
 * @created 01/11/2022 - 8:17 PM
 */
@Data
public class ShopResponseDTO {
  private Long id;
  private String name;
  private String slug;
  private String description;
  private UserSimpleResponseDTO user;
  private String email;
  private boolean isEmailVerified;
  private String phone;
  private boolean isPhoneVerified;
  private double percent;
  private AddressResponseDTO address;
  private boolean enabled;
  private String avatar;
  private String background;
  private Date createdAt;
  private Date updatedAt;
  private String lastLogin;
}
