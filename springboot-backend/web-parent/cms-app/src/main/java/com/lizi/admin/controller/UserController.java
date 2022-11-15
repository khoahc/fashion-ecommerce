package com.lizi.admin.controller;

import com.lizi.admin.dto.user.UserReqDto;
import com.lizi.admin.service.CloudinaryService;
import com.lizi.admin.service.UserService;
import com.lizi.admin.util.Constant;
import com.lizi.common.entity.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "/api/v1/users")
@CrossOrigin(origins = "*")
public class UserController {

  @Autowired
  private UserService userService;

  @Autowired
  private CloudinaryService cloudinaryService;

  @GetMapping(value = "")
  public ResponseEntity<ResponseObject> getAll() {
    return ResponseEntity.ok().body(ResponseObject.builder().status(HttpStatus.OK).message(
        Constant.SUCCESS).data(userService.getAll()).build());
  }

  @GetMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> getUser(@PathVariable(name = "id") Long id) {
    return ResponseEntity.ok().body(ResponseObject.builder().status(HttpStatus.OK).message(
        Constant.SUCCESS).data(userService.getUser(id)).build());
  }

  @PostMapping(value = "")
  public ResponseEntity<ResponseObject> createUser(@RequestBody UserReqDto userReqDto) {
    return ResponseEntity.ok().body(ResponseObject.builder().status(HttpStatus.OK).message(
        Constant.SUCCESS).data(userService.createUser(userReqDto)).build());
  }

  @PostMapping(value = "/photos")
  public ResponseEntity<ResponseObject> uploadPhoto(
      @RequestParam(name = "photo") MultipartFile multipartFile) {
    return ResponseEntity.ok().body(ResponseObject.builder().message(Constant.SUCCESS).status(
        HttpStatus.OK).data(cloudinaryService.uploadImageUser(multipartFile)).build());
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> updateUser(@PathVariable(name = "id") Long id,
      @RequestBody UserReqDto userReqDto) {
    return ResponseEntity.ok().body(ResponseObject.builder().status(HttpStatus.OK).message(
        Constant.SUCCESS).data(userService.updateUser(id, userReqDto)).build());
  }

  @PutMapping(value = "/{id}/photo")
  public ResponseEntity<ResponseObject> updatePhoto(@PathVariable(name = "id") Long id) {
    return null;
  }

  @DeleteMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> deleteUser(@PathVariable(name = "id") Long id) {
    userService.deleteUser(id);
    return ResponseEntity.ok().body(ResponseObject.builder().status(HttpStatus.OK).message(
        Constant.SUCCESS).build());
  }

}
