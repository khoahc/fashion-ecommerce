package com.lizi.admin.controller;

import com.lizi.admin.dto.auth.AuthRequest;
import com.lizi.admin.dto.auth.AuthResponse;
import com.lizi.admin.security.CustomUserDetails;
import com.lizi.admin.security.JwtTokenUtil;
import com.lizi.common.entity.ResponseObject;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {
  @Autowired
  AuthenticationManager authManager;
  @Autowired
  JwtTokenUtil jwtUtil;

  @PostMapping("/auth/login")
  public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request) {
    try {
      Authentication authentication = authManager
          .authenticate(
              new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

      CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
      String accessToken = jwtUtil.generateAccessToken(user.getUser());
      AuthResponse response = AuthResponse.builder().email(user.getUsername()).accessToken(accessToken)
          .build();

      return ResponseEntity.ok().body(
          ResponseObject.builder().status(HttpStatus.OK).message("Login Successfully")
              .data(response).build());

    } catch (BadCredentialsException ex) {
      return new ResponseEntity<>(
          ResponseObject.builder().status(HttpStatus.UNAUTHORIZED).message("Bad login information")
              .build(), HttpStatus.UNAUTHORIZED);
    }
  }
}
