package com.lizi.admin.controller;

import com.lizi.admin.dto.color.ColorReqDto;
import com.lizi.admin.service.ColorService;
import com.lizi.admin.util.Constant;
import com.lizi.common.entity.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/colors")
@CrossOrigin(origins = "*")
public class ColorController {

  @Autowired
  private ColorService colorService;

  @GetMapping
  public ResponseEntity<ResponseObject> getAllColor() {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(colorService.getAllColorResDto()).build());
  }

  @PostMapping
  public ResponseEntity<ResponseObject> createColor(@RequestBody ColorReqDto dto) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(colorService.createColor(dto)).build());
  }
}
