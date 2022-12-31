package gt.electronic.ecommerce.handlers;

import gt.electronic.ecommerce.entities.Image;
import gt.electronic.ecommerce.entities.Role;
import gt.electronic.ecommerce.entities.User;
import gt.electronic.ecommerce.exceptions.BadRequestException;
import gt.electronic.ecommerce.exceptions.OAuth2AuthenticationProcessingException;
import gt.electronic.ecommerce.handlers.user.OAuth2UserInfo;
import gt.electronic.ecommerce.handlers.user.OAuth2UserInfoFactory;
import gt.electronic.ecommerce.models.enums.AuthProvider;
import gt.electronic.ecommerce.models.enums.EImageType;
import gt.electronic.ecommerce.models.enums.ERole;
import gt.electronic.ecommerce.repositories.RoleRepository;
import gt.electronic.ecommerce.repositories.UserRepository;
import gt.electronic.ecommerce.utils.CodeConfig;
import gt.electronic.ecommerce.utils.GenerateUtil;
import gt.electronic.ecommerce.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.Optional;

/**
 * @author minh phuong
 * @created 27/11/2022 - 8:53 PM
 */
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
  public static final String branchName = OAuth2User.class.getSimpleName();
  private RoleRepository roleRepo;

  @Autowired public void RoleRepository(RoleRepository roleRepo) {
    this.roleRepo = roleRepo;
  }

  private UserRepository userRepo;

  @Autowired public void UserRepository(UserRepository userRepo) {
    this.userRepo = userRepo;
  }

  @Override
  public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
    OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
    try {

      return processOAuth2User(oAuth2UserRequest, oAuth2User);
    } catch (AuthenticationException ex) {
      throw ex;
    } catch (Exception ex) {
      // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
      throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
    }
  }

  private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
    this.LOGGER.info("processOAuth2User");
    OAuth2UserInfo oAuth2UserInfo =
        OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(),
                                                oAuth2User.getAttributes());
    if (ObjectUtils.isEmpty(oAuth2UserInfo.getEmail())) {
      throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
    }

    Optional<User> userOptional = userRepo.findByEmail(oAuth2UserInfo.getEmail());
    User user;
    if (userOptional.isPresent()) {
      user = userOptional.get();
      if (!user.getProvider()
          .equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
        throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                                                              user.getProvider() + " account. Please use your " + user.getProvider() +
                                                              " account to login.");
      }
      user = updateExistingUser(user, oAuth2UserInfo);
    } else {
      user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
    }
    return User.create(user, oAuth2User.getAttributes());
  }

  private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
    User user = new User();

    user.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
    user.setProviderId(oAuth2UserInfo.getId());
    if (oAuth2UserInfo.getAttributes().get("given_name") == null || oAuth2UserInfo.getAttributes().get("family_name") == null) {
      String[] name = Utils.getFirstNameAndLastNameFromFullName(oAuth2UserInfo.getName());
      user.setFirstName(name[0]);
      user.setLastName(name[1]);
    } else {
      user.setFirstName((String) oAuth2UserInfo.getAttributes().get("given_name"));
      user.setLastName((String) oAuth2UserInfo.getAttributes().get("family_name"));
    }
    user.setEmail(oAuth2UserInfo.getEmail());
    user.setEmailVerified(true);
    String usernameGenerate;
    do {
      usernameGenerate = GenerateUtil.generate(CodeConfig.length(Utils.LENGTH_USERNAME_GENERATE));
    } while (this.userRepo.existsByUsername(usernameGenerate));
    user.setUsername(usernameGenerate);
    Role roleFound = this.roleRepo.findByName(ERole.ROLE_CUSTOMER).orElseThrow(() -> new BadRequestException(
        "Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication"));
    user.setRole(roleFound);
    if (oAuth2UserInfo.getImageUrl() != null) {
      Image image = new Image(oAuth2UserInfo.getImageUrl(), EImageType.IMAGE_USER);
      user.setAvatar(image);
    }
    return this.userRepo.save(user);
  }

  private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
    existingUser.setFirstName(oAuth2UserInfo.getName());
    Image image = new Image(oAuth2UserInfo.getImageUrl(), EImageType.IMAGE_USER);
    existingUser.setAvatar(image);
    return userRepo.save(existingUser);
  }

}
