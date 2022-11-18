package gt.electronic.ecommerce.mapper;

import gt.electronic.ecommerce.dto.response.CommentResponseDTO;
import gt.electronic.ecommerce.entities.Comment;

/**
 * @author minh phuong
 * @created 12/09/2022 - 9:06 PM
 * @project gt-backend
 */
public interface CommentMapper {
  CommentResponseDTO commentToCommentResponseDTO(Comment entity, boolean... isFull);
  CommentResponseDTO commentToReplyForCommentResponseDTO(Comment entity, boolean... isFull);
}
