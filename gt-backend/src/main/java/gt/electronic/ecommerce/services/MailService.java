package gt.electronic.ecommerce.services;

import javax.mail.MessagingException;

public interface MailService {
    void sendSimpleMessage(
            String to, String subject, String text);

    void sendMessageWithAttachment(
            String to, String subject, String text, String pathToAttachment) throws MessagingException;
}
