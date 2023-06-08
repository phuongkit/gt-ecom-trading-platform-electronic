package gt.electronic.ecommerce.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tbl_product_black_list")
public class ProductBlackList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column
    private Long shopId;

    @Column(name = "enabled", nullable = true)
    @NotNull(message = "An enabled is required!")
    private boolean enabled = true;

    @Column(name = "scanAt")
    @UpdateTimestamp
    private Date scanAt;

    @Column(name = "last_scanAt")
    @UpdateTimestamp
    private Date lastScanAt;

    @Column(name = "neg_total")
    private Long negTotal;

    @Column(name = "total")
    private Long total;
}
