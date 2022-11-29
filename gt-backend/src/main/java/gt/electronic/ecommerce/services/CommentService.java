package gt.electronic.ecommerce.services;

import gt.electronic.ecommerce.dto.request.CommentCreationDTO;
import gt.electronic.ecommerce.dto.request.CommentUpdationDTO;
import gt.electronic.ecommerce.dto.response.CommentResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author minh phuong
 * @created 12/09/2022 - 8:21 PM
 */
public interface CommentService {
  Page<CommentResponseDTO> getAllMainCommentsByProduct(Long productId, boolean isHasChild, Pageable pageable);

  Page<CommentResponseDTO> getAllCommentsByUser(Integer userId, boolean isHasChild, Pageable pageable);

  Page<CommentResponseDTO> getAllCommentsByProductAndUser(Long productId, Integer userId, boolean isHasChild, Pageable pageable);

  Page<CommentResponseDTO> getAllRelyCommentsByMainComment(Long mainCommentId, Pageable pageable);

  CommentResponseDTO getCommentById(Long id, boolean isHasChild);

  CommentResponseDTO createComment(String loginKey, CommentCreationDTO creationDTO, MultipartFile[] imageGalleryFile);
//  CommentResponseDTO createMainComment(CommentCreationDTO creationDTO, MultipartFile[] imageGalleryFile);
//
//  CommentResponseDTO createRelyComment(Long relyCommentId, RelyCommentCreationDTO creationDTO, MultipartFile[] imageGalleryFile);

  CommentResponseDTO updateComment(Long id, CommentUpdationDTO updationDTO, MultipartFile[] imageGalleryFile);

  CommentResponseDTO deleteCommentById(Long id);
}
