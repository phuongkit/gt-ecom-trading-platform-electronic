package gt.electronic.ecommerce.exceptions;

import gt.electronic.ecommerce.utils.Utils;

/**
 * @author minh phuong
 * @created 06/11/2022 - 1:51 PM
 */
public class AccessTokenNotValidException extends RuntimeException {
  public AccessTokenNotValidException(){
    super(String.format(Utils.FIELD_NOT_VALID, "accessToken"));
  }
  public AccessTokenNotValidException(String message){
    super(message);
  }

  public AccessTokenNotValidException(String message, Throwable cause){
    super(message, cause);
  }
}
