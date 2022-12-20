package com.lizi.customer.controller;

import com.lizi.customer.dto.response.ResponseObject;
import com.lizi.customer.service.WardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value ="/api/v1/ward")
@CrossOrigin(origins = "*")
public class WardController {
  @Autowired
  private WardService wardService;

  @RequestMapping(value = "/{districtId}", method = RequestMethod.GET)
  public ResponseObject getWardsByDistrictId(@PathVariable(name = "districtId") String districtId) {
    return new ResponseObject<>(HttpStatus.OK, "Thành công", wardService.getWardsByDistrictId(Long.parseLong(districtId)));
  }
}
