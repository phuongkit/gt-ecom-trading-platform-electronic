package gt.electronic.ecommerce.mapper;

import gt.electronic.ecommerce.dto.response.FeedbackResponseDTO;
import gt.electronic.ecommerce.entities.Comment;
import gt.electronic.ecommerce.entities.Feedback;

/**
 * @author minh phuong
 * @created 12/09/2022 - 9:07 PM
 * @project gt-backend
 */
public interface FeedbackMapper {
  FeedbackResponseDTO feedbackToFeedbackResponseDTO(Feedback entity, boolean... isFull);
  FeedbackResponseDTO commentToReplyForFeedbackResponseDTO(Comment entity, boolean... isFull);
}
