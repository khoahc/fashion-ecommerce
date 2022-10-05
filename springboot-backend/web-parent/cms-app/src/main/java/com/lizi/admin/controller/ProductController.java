package com.lizi.admin.controller;

import com.lizi.admin.dto.product.ProductReqDto;
import com.lizi.admin.service.ProductService;
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
public class ProductController {

  @Autowired
  private ProductService productService;

  @GetMapping(value = "")
  public ResponseEntity<ResponseObject> getAll() {
    return ResponseEntity.ok().body(
        ResponseObject.builder().code(HttpStatus.OK.value()).message(Constant.SUCCESS)
            .data(productService.getAll()).build());
  }

  @GetMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> getProduct(@PathVariable(name = "id") Long id) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().code(HttpStatus.OK.value()).message(Constant.SUCCESS)
            .data(productService.getProduct(id)).build());
  }

  @PostMapping(value = "")
  public ResponseEntity<ResponseObject> createProduct(@RequestBody ProductReqDto productReqDto) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().code(HttpStatus.OK.value()).message(Constant.SUCCESS)
            .data(productService.createProduct(productReqDto)).build());
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> updateProduct(@PathVariable(name = "id") Long id,
      @RequestBody ProductReqDto productReqDto) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().code(HttpStatus.OK.value()).message(Constant.SUCCESS)
            .data(productService.updateProduct(id, productReqDto)).build());
  }

  @DeleteMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> deleteProduct(@PathVariable(name = "id") Long id) {
    productService.deleteCategory(id);
    return ResponseEntity.ok().body(
        ResponseObject.builder().code(HttpStatus.OK.value()).message(Constant.SUCCESS).build());
  }
}
