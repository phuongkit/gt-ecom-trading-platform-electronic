package gt.electronic.ecommerce.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * @author minh phuong
 * @created 12/09/2022 - 8:08 PM
 * @project gt-backend
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackResponseDTO {
  private Long replyForFeedbackId;
  private Long id;
  private Long productId;
  private UserSimpleResponseDTO author;
  private String content;
  private int star;
  private FeedbackResponseDTO[] childFeedbacks;
  private UserSimpleResponseDTO replyForUser;
  private String[] imageGallery;
  private String timeDistance;
  private boolean isUpdated;
  private Date createdAt;
  private Date updatedAt;
}
