package gt.electronic.ecommerce.models.enums;

/**
 * @author minh phuong
 * @created 01/10/2022 - 11:28 AM
 * @project gt-backend
 */
public enum EGender {
  FEMALE(Names.FEMALE),
  MALE(Names.MALE),
  UNKNOWN(Names.UNKNOWN);

  public static class Names {
    public static final String FEMALE = "FEMALE";
    public static final String MALE = "MALE";
    public static final String UNKNOWN = "UNKNOWN";
  }

  private final String label;

  private EGender(String label) {
    this.label = label;
  }

  public String toString() {
    return this.label;
  }
}