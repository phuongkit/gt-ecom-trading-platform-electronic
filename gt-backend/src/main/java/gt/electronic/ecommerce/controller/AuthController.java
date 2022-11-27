package gt.electronic.ecommerce.controller;

import gt.electronic.ecommerce.dto.request.AuthRequest;
import gt.electronic.ecommerce.dto.request.ShopCreationDTO;
import gt.electronic.ecommerce.dto.response.AuthResponse;
import gt.electronic.ecommerce.dto.response.ResponseObject;
import gt.electronic.ecommerce.entities.Shop;
import gt.electronic.ecommerce.entities.User;
import gt.electronic.ecommerce.mapper.AuthMapper;
import gt.electronic.ecommerce.models.enums.ERole;
import gt.electronic.ecommerce.services.UserService;
import gt.electronic.ecommerce.utils.JwtTokenUtil;
import gt.electronic.ecommerce.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Map;

/**
 * @author minh phuong
 * @created 07/09/2022 - 11:13 PM
 * @project gt-backend
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/auth")

public class AuthController {
  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
  @Autowired
  AuthenticationManager authManager;
  private AuthMapper authMapper;

  @Autowired public void AuthMapper(AuthMapper authMapper) {
    this.authMapper = authMapper;
  }

  @Autowired
  UserService userService;

  private JwtTokenUtil jwtTokenUtil;

  @Autowired public void JwtTokenUtil(JwtTokenUtil jwtTokenUtil) {
    this.jwtTokenUtil = jwtTokenUtil;
  }

  @PostMapping("/login")
  public ResponseObject<?> login(@RequestBody @Valid AuthRequest request, HttpServletRequest servletRequest) {
    if (request.isOtp()) {
      try {
        userService.loadUserByUsername(request.getPhone());
      } catch (UsernameNotFoundException e) {
        this.userService.registerUser(request, false);
      }
      request.setPassword(Utils.DEFAULT_PASSWORD);
    }
    try {
      Authentication authentication =
          this.authManager.authenticate(
              new UsernamePasswordAuthenticationToken(request.isOtp() ? request.getPhone() : request.getEmail(),
                                                      request.getPassword()));
      User user = (User) authentication.getPrincipal();
      String accessToken = this.jwtTokenUtil.generateAccessToken(user);
//      AuthResponse response = new AuthResponse(user.getPhone(), accessToken);
      AuthResponse response = this.authMapper.userToAuthResponse(user, accessToken);

      return new ResponseObject<>(HttpStatus.OK, "Login Successfully", response);

    } catch (BadCredentialsException ex) {
      return new ResponseObject<>(HttpStatus.UNAUTHORIZED, "Bad login information");
    }
  }

//  @PostMapping("logout")
//  @RolesAllowed({
//      ERole.Names.ADMIN,
//      ERole.Names.SELLER,
//      ERole.Names.CUSTOMER,
//      ERole.Names.SHIPPER,
//      ERole.Names.ASSISTANT,
//      ERole.Names.EDITOR,
//      ERole.Names.SALESPERSON
//  })
//  public ResponseEntity<?> logout(@RequestBody @Valid AuthRequest request) {
//    try {
////      String message = this.jwtUtil.refreshToken(re)
//      return ResponseEntity.ok()
//          .body(new ResponseObject(HttpStatus.OK, "Logout Successfully", null));
//    } catch (BadCredentialsException ex) {
//      return new ResponseEntity<>(
//          new ResponseObject(HttpStatus.UNAUTHORIZED, "Bad login information"), HttpStatus.OK);
//    }
//  }

  @PostMapping("/register")
  public ResponseObject<?> register(
      @RequestBody @Valid AuthRequest request,
      @RequestParam(name = "seller", required = false, defaultValue = "false") boolean isSeller
      ) {
    this.userService.registerUser(request, isSeller);
    try {
      Authentication authentication =
          this.authManager.authenticate(
              new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

      User user = (User) authentication.getPrincipal();
      String accessToken = jwtTokenUtil.generateAccessToken(user);
//      AuthResponse response = new AuthResponse(user.getPhone(), accessToken);
      AuthResponse response = this.authMapper.userToAuthResponse(user, accessToken);

      return new ResponseObject<>(HttpStatus.OK, "Register Successfully", response);
    } catch (BadCredentialsException ex) {
      return new ResponseObject<>(HttpStatus.UNAUTHORIZED, "Bad login information");
    }
  }

//  @PostMapping("/register-grant-permission")
//  @RolesAllowed({ERole.Names.CUSTOMER, ERole.Names.ADMIN})
//  public ResponseObject<?> registerGrantPermission(@RequestBody @Valid ShopCreationDTO creationDTO) {
//    this.userService.registerUser(request);
//    try {
//      Authentication authentication =
//          this.authManager.authenticate(
//              new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
//
//      User user = (User) authentication.getPrincipal();
//      String accessToken = jwtTokenUtil.generateAccessToken(user);
////      AuthResponse response = new AuthResponse(user.getPhone(), accessToken);
//      AuthResponse response = this.authMapper.userToAuthResponse(user, accessToken);
//
//      return new ResponseObject<>(HttpStatus.OK, "Register Successfully", response);
//    } catch (BadCredentialsException ex) {
//      return new ResponseObject<>(HttpStatus.UNAUTHORIZED, "Bad login information");
//    }
//  }


  @PostMapping("/check-access-token")
  public ResponseObject<?> checkToken(HttpServletRequest request) {
    try {
      String accessToken = jwtTokenUtil.getAccessToken(request);
      if (jwtTokenUtil.validateAccessToken(accessToken)) {
        return new ResponseObject<>(HttpStatus.OK, "Access token is valid", null);
      }
    } catch (Exception ex) {
      LOGGER.error(ex.getMessage());
    }
    return new ResponseObject<>(HttpStatus.UNAUTHORIZED, "Access token is non valid", null);
  }
}
