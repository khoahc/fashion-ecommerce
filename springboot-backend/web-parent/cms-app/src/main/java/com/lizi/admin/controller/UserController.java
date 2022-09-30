package com.lizi.admin.controller;

import com.lizi.admin.service.CloudinaryService;
import com.lizi.admin.service.UserService;
import com.lizi.admin.util.Constant;
import com.lizi.common.entity.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "/api/v1/users")
public class UserController {

  @Autowired
  private UserService userService;

  @Autowired
  private CloudinaryService cloudinaryService;

  @GetMapping(value = "")
  public ResponseEntity<ResponseObject> getAll() {
    return ResponseEntity.ok().body(ResponseObject.builder().code(HttpStatus.OK.value()).message(
        Constant.SUCCESS).data(userService.getAll()).build());
  }

  @PostMapping(value = "/photos")
  public ResponseEntity<ResponseObject> uploadPhoto(
      @RequestParam(name = "photo") MultipartFile multipartFile) {
    return ResponseEntity.ok().body(ResponseObject.builder().message(Constant.SUCCESS).code(
        HttpStatus.OK.value()).data(cloudinaryService.uploadImageUser(multipartFile)).build());
  }

}
