package com.lizi.customer.controller;

import com.lizi.customer.dto.response.ResponseObject;
import com.lizi.customer.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value ="/api/v1/province")
@CrossOrigin(origins = "http://localhost")
public class ProvinceController {
  @Autowired
  private ProvinceService provinceService;

  @RequestMapping(value = "", method = RequestMethod.GET)
  public ResponseObject getAllProvince() {
    return new ResponseObject<>(HttpStatus.OK, "Thành công", provinceService.getAllProvince());
  }
}
