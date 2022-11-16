package gt.electronic.ecommerce.entities;

import gt.electronic.ecommerce.models.enums.EGender;
import gt.electronic.ecommerce.models.enums.EOrderStatus;
import gt.electronic.ecommerce.utils.Utils;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * @author minh phuong
 * @created 09/09/2022 - 1:39 PM
 * @project gt-backend
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tbl_order")
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Column(name = "gender")
  @Enumerated(EnumType.STRING)
  private EGender gender;

  @Column(name = "full_name", length = 45)
  @NotNull(message = "An fullName is required!")
  private String fullName;

  @Column(name = "email", length = 320)
  @Size(message = "Invalid email size.", max = 320, min = 10)
  //  @NotNull(message = "An email is required!")
  @Pattern(regexp = (Utils.REGEX_EMAIL), message = "Invalid email")
  private String email;

  @Column(name = "phone", length = 13)
  @Size(message = "Invalid phone size.", max = 13, min = 9)
  @NotNull(message = "An phone is required!")
  @Pattern(regexp = (Utils.REGEX_PHONE), message = "Invalid phone")
  private String phone;

  @Column(name = "line", nullable = false)
  @NotNull(message = "An line is required!")
  private String line;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "location_id", nullable = false)
  private Location location;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "payment_id", nullable = false)
  private Payment payment;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "shipping_method_id", nullable = false)
  private ShippingMethod shippingMethod;

  @Column(name = "transport_fee", nullable = false)
  @NotNull(message = "An transportFee is required!")
  private BigDecimal transportFee;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "discount_id")
  private Discount discount;

  @Column(name = "pay_at")
  @Temporal(TemporalType.TIMESTAMP)
  private Date payAt;

  @Column(name = "note", length = 500)
  private String note;

  @Column(name = "total_price", nullable = false)
  @NotNull(message = "An total price is required!")
  @DecimalMin(value = "0", message = "Total Price must be greater than or equal to 0.")
  private BigDecimal totalPrice;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
  private Set<OrderItem> orderItemSet = new HashSet<>();

  @Enumerated(EnumType.STRING)
  @Column(name = "status", length = 50, nullable = false)
  @NotNull(message = "An status is required!")
  private EOrderStatus status;

  @Column(name = "created_at")
  @CreationTimestamp
  private Date createdAt;

  @Column(name = "updated_at")
  @UpdateTimestamp
  private Date updatedAt;
}
