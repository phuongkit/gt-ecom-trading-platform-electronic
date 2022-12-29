package gt.electronic.ecommerce.services;

import gt.electronic.ecommerce.dto.request.BrandCreationDTO;
import gt.electronic.ecommerce.dto.response.BrandResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @author minh phuong
 * @created 11/09/2022 - 10:00 AM
 */
public interface BrandService {
  List<BrandResponseDTO> getAllBrands(String keyword);

  List<BrandResponseDTO> getAllBrandsByCategory(String keyword, Integer categoryId);
  List<BrandResponseDTO> getAllBrandsByShop(Integer shopId);

  BrandResponseDTO getBrandById(Integer id);
  BrandResponseDTO getBrandBySlug(String slug);

  BrandResponseDTO createBrand(BrandCreationDTO creationDTO, MultipartFile imageFile);

  BrandResponseDTO updateBrand(Integer id, BrandCreationDTO creationDTO, MultipartFile imageFile);

  BrandResponseDTO deleteBrandById(Integer id);
}