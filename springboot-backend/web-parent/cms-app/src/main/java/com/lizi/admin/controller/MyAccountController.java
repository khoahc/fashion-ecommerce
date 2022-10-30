package com.lizi.admin.controller;

import com.lizi.admin.service.UserService;
import com.lizi.admin.util.Constant;
import com.lizi.common.entity.ResponseObject;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/v1/my")
public class MyAccountController {

  @Autowired
  private UserService userService;

  @GetMapping
  public ResponseEntity<ResponseObject> getInfo(Principal principal) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(userService.getUser(principal.getName())).build());
  }

}
