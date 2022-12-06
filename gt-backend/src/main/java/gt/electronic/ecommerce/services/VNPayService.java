package gt.electronic.ecommerce.services;

import gt.electronic.ecommerce.dto.request.VNPayCreationDTO;
import gt.electronic.ecommerce.dto.response.PaymentUrlResponseDTO;

import java.io.UnsupportedEncodingException;

/**
 * @author minh phuong
 * @created 20/11/2022 - 6:58 PM
 */
public interface VNPayService {
  PaymentUrlResponseDTO getPaymentUrlVNPay(String ipAddress, VNPayCreationDTO creationDTO) throws UnsupportedEncodingException;
}
