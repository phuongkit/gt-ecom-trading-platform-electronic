package gt.electronic.ecommerce.models.enums;

public enum ESentiment {
    SENTIMENT_NEGATIVE(ESentiment.Names.NEGATIVE),
    SENTIMENT_NEUTRAL(ESentiment.Names.NEUTRAL),
    SENTIMENT_POSITIVE(ESentiment.Names.POSITIVE),
    SENTIMENT_UNKNOW(ESentiment.Names.UNKNOW);

    public class Names {
        public static final String NEGATIVE = "Nagetive";
        public static final String NEUTRAL = "Neutral";
        public static final String POSITIVE = "Positive";
        public static final String UNKNOW = "Unknow";
    }
    private final String label;

    private ESentiment(String label) {
        this.label = label;
    }

    public String toString() {
        return this.label;
    }
    public static ESentiment getESentimentFromString(String text) {
        return switch (text) {
            case Names.NEGATIVE -> SENTIMENT_NEGATIVE;
            case Names.POSITIVE -> SENTIMENT_POSITIVE;
            default -> SENTIMENT_NEUTRAL;
        };
    }
}
