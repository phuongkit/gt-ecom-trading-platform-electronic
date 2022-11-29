package gt.electronic.ecommerce.services;

import gt.electronic.ecommerce.dto.request.*;
import gt.electronic.ecommerce.dto.response.*;
import gt.electronic.ecommerce.models.clazzs.ProductRating;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author minh phuong
 * @created 12/09/2022 - 8:21 PM
 */
public interface FeedbackService {
  Page<FeedbackResponseDTO> getAllMainFeedbacksByProduct(Long productId, boolean isHasChild, Pageable pageable);

  Page<FeedbackResponseDTO> getAllFeedbacksByUser(Integer userId, boolean isHasChild, Pageable pageable);

  Page<FeedbackResponseDTO> getAllRelyFeedbacksByMainFeedback(Long mainFeedbackId, Pageable pageable);

  FeedbackResponseDTO getFeedbackById(Long id, boolean isHasChild);

  FeedbackResponseDTO getFeedbackByProductAndUser(Long productId, Integer userId, boolean isHasChild);

  ProductRating getProductRatingByProduct(Long productId);

  FeedbackResponseDTO createFeedback(String loginKey, FeedbackCreationDTO creationDTO, MultipartFile[] imageGalleryFile);

  FeedbackResponseDTO updateFeedback(Long id, FeedbackUpdationDTO updationDTO, MultipartFile[] imageGalleryFile);

  FeedbackResponseDTO deleteFeedbackById(Long id);
}
