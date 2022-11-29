package gt.electronic.ecommerce;

/**
 * @author minh phuong
 * @created 12/09/2022 - 11:19 PM
 */
public class Main {

  public static void main(String[] args) {
    int i = 0;
    i++; System.out.println(i + ":" + Test(2, 10, 0) );
    i++; System.out.println(i + ":" + Test(2, 9, 0) );
    i++; System.out.println(i + ":" + Test(7, 1, 3) );
    i++; System.out.println(i + ":" + Test(7, 1, 2) );
    i++; System.out.println(i + ":" + Test(7, 11, 1) );
    i++; System.out.println(i + ":" + Test(7, -1, 0) );
    i++; System.out.println(i + ":" + Test(8, 0, 0) );
  }

  public static int Test(int a, int b, int c)
  {
    int t;
    switch (a) {
      case 2: if (b > 9) t = 1;
      else t = 8;
        break;
      case 7: if (b<0 || b > 10) t = 0;
      else
      if (c>=3) t = 3;
      else t = 4;
        break;
      default: t = 5;
    }
    return t;
  }

}
