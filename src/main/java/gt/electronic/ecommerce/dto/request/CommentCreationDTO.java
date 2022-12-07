package gt.electronic.ecommerce.dto.request;

import lombok.*;

/**
 * @author minh phuong
 * @created 12/09/2022 - 8:07 PM
 * @project gt-backend
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentCreationDTO {
  private Long productId;
  private Long authorId;
  private String content;
  private Long replyForCommentId;
}
