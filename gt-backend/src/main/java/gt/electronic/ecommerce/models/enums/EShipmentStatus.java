package gt.electronic.ecommerce.models.enums;

import org.apache.poi.ss.formula.functions.Na;

public enum EShipmentStatus {
//    PENDING,
    SHIPPING(Names.SHIPPING),
    COMPLETED(Names.COMPLETED);

    public static class Names {
//        public static final String PENDING = "Đang chờ";
        public static final String SHIPPING = "Đang vận chuyển";
        public static final String COMPLETED = "Đã hoàn thành";
    }

    private final String label;

    private EShipmentStatus(String label) {
        this.label = label;
    }

    public String toString() {
        return this.label;
    }
}
