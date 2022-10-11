package com.lizi.admin.controller;

import com.lizi.admin.dto.product.ProductOptionReqDto;
import com.lizi.admin.service.ProductOptionService;
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
@RequestMapping(value = "/api/v1/products")
public class ProductOptionController {

  @Autowired
  private ProductOptionService productOptionService;

  @GetMapping(value = "/{productId}/options")
  public ResponseEntity<ResponseObject> getAllOptionsOfProduct(
      @PathVariable(name = "productId") Long productId) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(productOptionService.getAllOptionOfProduct(productId)).build());
  }

  @GetMapping(value = "/{productId}/options/{optionId}")
  public ResponseEntity<ResponseObject> getOption(@PathVariable(name = "productId") Long productId,
      @PathVariable(name = "optionId") Long optionId) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(productOptionService.getProductOption(productId, optionId)).build());
  }

  @PostMapping(value = "/{productId}/options")
  public ResponseEntity<ResponseObject> createProductOption(
      @PathVariable(name = "productId") Long productId,
      @RequestBody ProductOptionReqDto productOptionReqDto) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(productOptionService.createProductOption(productId, productOptionReqDto))
            .build());
  }

  @PutMapping(value = "/options/{optionId}")
  public ResponseEntity<ResponseObject> updateProductOption(
      @PathVariable(name = "optionId") Long optionId,
      @RequestBody ProductOptionReqDto productOptionReqDto) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(
                productOptionService.updateProductOption(optionId, productOptionReqDto))
            .build());
  }

  @DeleteMapping(value = "/options/{optionId}")
  public ResponseEntity<ResponseObject> deleteProductOption(
      @PathVariable(name = "optionId") Long optionId) {
    productOptionService.deleteProductOption(optionId);
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS).build());
  }
}
