package gt.electronic.ecommerce;

import gt.electronic.ecommerce.utils.ClassTest;
import gt.electronic.ecommerce.utils.InitData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Objects;

@SpringBootApplication
// @Import(EmbeddedTomcatConfiguration.class)
public class GtBackendApplication implements CommandLineRunner {
  private final Logger LOGGER = LoggerFactory.getLogger(GtBackendApplication.class);

  private ClassTest classTest;
  @Autowired public void ClassTest(ClassTest classTest) {
    this.classTest = classTest;
  }
  private InitData initData;
  @Autowired public void InitData(InitData initData) {
    this.initData = initData;
  }
  @Value("${spring.jpa.hibernate.ddl-auto}")
  private String hibernate_ddl;

  public static void main(String[] args) {
    SpringApplication.run(GtBackendApplication.class, args);
  }

  @Override
  public void run(String... args)  {
    if (Objects.equals(hibernate_ddl, "create") || Objects.equals(hibernate_ddl, "create-drop")) {
      initData();
    }
//    classTest.testApiGHN();
//    initData();
//    this.LOGGER .info(saleService.getMostOptimalSaleByProduct(10l).getName());
  }

  public void initData() {
    initData.Init();
  }
}