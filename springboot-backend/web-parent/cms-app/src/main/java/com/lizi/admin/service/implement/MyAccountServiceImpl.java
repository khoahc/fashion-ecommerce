package com.lizi.admin.service.implement;

import com.lizi.admin.dto.user.UserResDto;
import com.lizi.admin.service.MyAccountService;
import com.lizi.admin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class MyAccountServiceImpl implements MyAccountService {

  @Autowired
  private UserService userService;

  @Override
  public UserResDto getUserInfo() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentPrincipalName = authentication.getName();
    return userService.getUser(currentPrincipalName);
  }
}
