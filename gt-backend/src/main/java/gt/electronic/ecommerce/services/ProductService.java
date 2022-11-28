package gt.electronic.ecommerce.services;

import gt.electronic.ecommerce.dto.request.ProductCreationDTO;
import gt.electronic.ecommerce.dto.response.ProductGalleryDTO;
import gt.electronic.ecommerce.dto.response.ProductResponseDTO;
import gt.electronic.ecommerce.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.Map;

/**
 * @author minh phuong
 * @created 11/09/2022 - 9:59 AM
 */
public interface ProductService {
  Page<ProductGalleryDTO> getAllProduct(Pageable pageable);

  Page<ProductGalleryDTO> getAllProductOnTradingByPage(Pageable pageable);

  Page<ProductGalleryDTO> filterProduct(
      String keyword, String brandName, String categoryName, String shopName, String locationString, BigDecimal minPrice,
      BigDecimal maxPrice, Pageable pageable);

  Page<ProductGalleryDTO> filterProductByKeyword(String keyword, String locationString,
                                                 int sortOption, BigDecimal minPrice, BigDecimal maxPrice,
                                                 Pageable pageable);

  Page<ProductGalleryDTO> getAllProductCategoryIdAndBrandId(Integer brandId, Integer categoryId, Integer shopId, String locationString,
                                                             int sortOption, BigDecimal minPrice, BigDecimal maxPrice,
                                                             Pageable pageable);

  ProductResponseDTO getProductById(Long id);

  ProductResponseDTO getProductBySlug(String slug);

  ProductResponseDTO createProduct(String loginKey,
      ProductCreationDTO creationDTO, MultipartFile thumbnailFile, MultipartFile[] imageGalleryFile, boolean...isAdmin);

  ProductResponseDTO updateProduct(String loginKey,
      Long id, ProductCreationDTO creationDTO, MultipartFile thumbnailFile, MultipartFile[] imageGalleryFile, boolean...isAdmin);

  ProductResponseDTO deleteProductById(String loginKey, Long id, boolean...isAdmin);

  Integer getSoldQuantityById(Long id);

  void createDescription(Product product, Map<String, String> descriptions);
}