package gt.electronic.ecommerce.services;

import gt.electronic.ecommerce.dto.request.RegisterShopPriceDTO;
import gt.electronic.ecommerce.dto.response.ShopResponseDTO;

import java.util.Date;

public interface PaymentService {
    void updatePaymentHistory(String paymentCode, Date payAt, boolean isSuccess);

    ShopResponseDTO registerShopPrice(RegisterShopPriceDTO registerShopPriceDTO);
}
