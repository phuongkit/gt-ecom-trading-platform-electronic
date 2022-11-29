package gt.electronic.ecommerce.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * @author minh phuong
 * @created 11/10/2022 - 7:21 PM
 */
@Component
public class ClassTest {
  private final Logger LOGGER = LoggerFactory.getLogger(ClassTest.class);
  @Value("${ghn.token.api}")
  private String tokenGHN;
  public void testApiGHN() throws IOException {
//    URLConnection connection = new URL("https://online-gateway.ghn.vn/shiip/public-api/master-data/province").openConnection();
//    connection.setRequestProperty("Token", tokenGHN);
////Get Response
//    InputStream is = connection.getInputStream();
//    this.LOGGER.info(connection.getContentType());
//    this.LOGGER.info(String.valueOf(is));
//    HttpResponse<JsonNode> response = Unirest.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/province")
//        .header("Token", tokenGHN)
//        .asJson();
//    System.out.println(response.getStatus());
//    System.out.println(response.getHeaders().get("Content-Type"));
  }
}
