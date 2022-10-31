package com.lizi.admin.controller;

import com.lizi.admin.dto.voucher.VoucherReqDto;
import com.lizi.admin.service.VoucherService;
import com.lizi.admin.util.Constant;
import com.lizi.common.entity.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/vouchers")
public class VoucherController {

  @Autowired
  private VoucherService voucherService;

  @GetMapping(value = "")
  public ResponseEntity<ResponseObject> getAll() {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(voucherService.getAll()).build());
  }

  @GetMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> getVoucher(@PathVariable(name = "id") Long id) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(voucherService.getVoucher(id)).build());
  }

  @PostMapping(value = "")
  public ResponseEntity<ResponseObject> createVoucher(@RequestBody VoucherReqDto voucherReqDto) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(voucherService.createVoucher(voucherReqDto)).build());
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> updateVoucher(@PathVariable(name = "id") Long id,
      @RequestBody VoucherReqDto voucherReqDto) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(voucherService.updateVoucher(id, voucherReqDto)).build());
  }

  @DeleteMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> deleteVoucher(@PathVariable(name = "id") Long id) {
    voucherService.deleteVoucher(id);
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS).build());
  }
}
