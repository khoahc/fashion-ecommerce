package com.lizi.admin.controller;

import com.lizi.admin.service.CloudinaryService;
import com.lizi.admin.util.Constant;
import com.lizi.common.entity.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "/api/v1/upload")
@CrossOrigin(origins = "*")
public class UploadController {

  @Autowired
  private CloudinaryService cloudinaryService;

  @PostMapping(value = "/image")
  public ResponseEntity<ResponseObject> uploadImage(
      @RequestParam(name = "image") MultipartFile multipartFile) {
    return ResponseEntity.ok().body(ResponseObject.builder().message(Constant.SUCCESS).status(
        HttpStatus.OK).data(cloudinaryService.uploadImage(multipartFile)).build());
  }

  @PostMapping(value = "/images")
  public ResponseEntity<ResponseObject> uploadImages(
      @RequestParam(name = "images") MultipartFile[] multipartFiles) {
    return ResponseEntity.ok().body(ResponseObject.builder().message(Constant.SUCCESS).status(
        HttpStatus.OK).data(cloudinaryService.uploadImages(multipartFiles)).build());
  }
}
