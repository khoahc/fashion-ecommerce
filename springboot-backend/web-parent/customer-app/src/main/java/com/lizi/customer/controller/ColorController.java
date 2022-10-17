package com.lizi.customer.controller;

import com.lizi.customer.dto.response.ResponseObject;
import com.lizi.customer.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/color")
@CrossOrigin(origins = "http://localhost")
public class ColorController {

  @Autowired
  private ColorService colorService;

  @RequestMapping(value = "/{slugCategory}", method = RequestMethod.GET)
  public ResponseObject getAllColorsByCategory(@PathVariable(name = "slugCategory") String slug) {
    return new ResponseObject<>(HttpStatus.OK, "Tìm màu thành công", colorService.getAllColorBySlugCategory(slug));
  }
}
