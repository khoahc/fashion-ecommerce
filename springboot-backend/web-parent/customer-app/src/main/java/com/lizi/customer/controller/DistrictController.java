package com.lizi.customer.controller;

import com.lizi.customer.dto.response.ResponseObject;
import com.lizi.customer.service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value ="/api/v1/district")
@CrossOrigin(origins = "*")
public class DistrictController {
  @Autowired
  private DistrictService districtService;

  @RequestMapping(value = "/{provinceId}", method = RequestMethod.GET)
  public ResponseObject getDistrictsByProvinceId(@PathVariable(name = "provinceId") String provinceId) {
    return new ResponseObject<>(HttpStatus.OK, "Thành công", districtService.getDistrictsByProvinceId(Long.parseLong(provinceId)));
  }
}
