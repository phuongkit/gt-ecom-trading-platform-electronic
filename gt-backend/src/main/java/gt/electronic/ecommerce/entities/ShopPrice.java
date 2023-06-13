package gt.electronic.ecommerce.entities;

import gt.electronic.ecommerce.models.enums.EDateType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.poi.ss.formula.functions.EDate;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_shop_price")
public class ShopPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 50, nullable = false, unique = true)
    @Size(message = "Invalid email size.", max = 50, min = 1)
    @NotNull(message = "An name is required!")
    private String name;

    @Column(name = "price", nullable = false)
    @NotNull(message = "An price is required!")
    @DecimalMin(value = "0", message = "Price must be greater than or equal to 0.")
    private BigDecimal price;

    private int maxProduct;

    private int number;

    @Enumerated(EnumType.STRING)
    @Column(length = 50, nullable = false)
    @NotNull(message = "An date type is required!")
    private EDateType dateType;

    @Lob
    private String description;

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

    public ShopPrice(String name, BigDecimal price, int maxProduct, int number, EDateType dateType, String description) {
        this.name = name;
        this.price = price;
        this.maxProduct = maxProduct;
        this.number = number;
        this.dateType = dateType;
        this.description = description;
    }
}
