package gt.electronic.ecommerce.entities;

import gt.electronic.ecommerce.models.enums.EProductStatus;
import gt.electronic.ecommerce.utils.Utils;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * @author minh phuong
 * @created 09/09/2022 - 1:38 PM
 * @project gt-backend
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tbl_product")
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name", length = 255, unique = true, nullable = false)
  @NotNull(message = "An name is required!")
  @Size(message = "Invalid name size.", max = 255, min = 1)
  private String name;

  @Column(name = "slug", length = 255, unique = true, nullable = false)
  @Size(message = "Invalid slug size.", max = 300, min = 1)
  @NotNull(message = "An name is required!")
  private String slug;

  @Column(name = "description", length = 15000)
  private String description;

  @Column(name = "stand_cost", nullable = false)
  @NotNull(message = "An standCost is required!")
  @DecimalMin(value = "0", message = "Stand Cost must be greater than or equal to 0.")
  private BigDecimal standCost;

  @Column(name = "list_price", nullable = false)
  @NotNull(message = "An listPrice is required!")
  @DecimalMin(value = "0", message = "List Price must be greater than or equal to 0.")
  private BigDecimal listPrice;

  @Column(name = "quantity", nullable = false)
  @NotNull(message = "An quantity is required!")
  @DecimalMin(value = "0", message = "Quantity must be greater than or equal to 0.")
  private Integer quantity;

  @ManyToOne
  @JoinColumn(name = "shop_id", nullable = false)
  private Shop shop;

  @Enumerated(EnumType.STRING)
  @Column(length = 50, nullable = false)
  @NotNull(message = "An status is required!")
  private EProductStatus status;

  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false)
  private Category category;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "brand_id", nullable = false)
  private Brand brand;

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private Set<ProductDescription> descriptions = new HashSet<>();

  public void addDescription(ProductDescription description) {
    descriptions.add(description);
  }

  public void removeDescription(ProductDescription description) {
    descriptions.remove(description);
  }

  @ManyToMany(mappedBy = "products")
  private Set<Sale> saleGallery = new HashSet<>();

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "thumbnail")
  private Image thumbnail;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "tbl_product_images",
      joinColumns = @JoinColumn(name = "product_id"),
      inverseJoinColumns = @JoinColumn(name = "image_id"))
  private Set<Image> imageGallery = new HashSet<>();

  @ManyToOne
  @JoinColumn(name = "location_id")
  private Location location;

  public void addImage(Image image) {
    imageGallery.add(image);
  }

  public void removeImage(Image image) {
    imageGallery.remove(image);
  }

  @Column(name = "created_at")
  @CreationTimestamp
  private Date createdAt;

  @Column(name = "updated_at")
  @UpdateTimestamp
  private Date updatedAt;

  public Product(String name, BigDecimal listPrice, Integer quantity, Category category, Brand brand, Shop shop, Location location, Image thumbnail, String description) {
    this.name = name;
    this.slug = Utils.toSlug(name) + "." + UUID.randomUUID().toString().replace("-", "");
    this.standCost = listPrice.multiply(new BigDecimal("0.9"));
    this.listPrice = listPrice;
    this.quantity = quantity;
    this.status = EProductStatus.PRODUCT_TRADING;
    this.category = category;
    this.brand = brand;
    this.shop = shop;
    if (location != null) {
      this.location = location;
    } else if (shop != null) {
      this.location = shop.getLocation();
    }
    this.thumbnail = thumbnail;
    this.description = description;
  }
}