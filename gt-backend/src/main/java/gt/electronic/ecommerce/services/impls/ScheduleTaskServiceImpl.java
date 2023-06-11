package gt.electronic.ecommerce.services.impls;

import gt.electronic.ecommerce.config.AppProperties;
import gt.electronic.ecommerce.repositories.ProcedureRepository;
import gt.electronic.ecommerce.services.ScheduleTaskService;
import gt.electronic.ecommerce.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class ScheduleTaskServiceImpl implements ScheduleTaskService {
    @Value("${app.shop.timeCheckBlackProductMs}")
    private long timeCheckBlackProductMs;

    @Value("${app.shop.minSentiment}")
    private int minSentiment;

    @Value("${app.shop.minNegativePercent}")
    private int minNegativePercent;

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy:MM:dd HH:mm:ss");
    ProcedureRepository procedureRepository;
    @Autowired
    public void ProcedureRepository(ProcedureRepository procedureRepository) {
        this.procedureRepository = procedureRepository;
    }



    @Override
    @Scheduled(fixedRate = 60000) //Utils.timeCheckBlackProductMs
    public void checkBlackListProduct() {
        this.LOGGER.warn(String.format(Utils.LOG_UPDATE_PRODUCT_BLACK_LIST_AT, sdf.format(new Date())));
        Date rangeTime = new Date((new Date()).getTime() - timeCheckBlackProductMs);
        procedureRepository.updateBlackListProduct(null, rangeTime, minSentiment, minNegativePercent);
    }
}