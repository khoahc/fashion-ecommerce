package com.lizi.admin.controller;

import com.lizi.admin.dto.product.ProductReqDto;
import com.lizi.admin.dto.product.ProductUpdateReqDto;
import com.lizi.admin.service.CloudinaryService;
import com.lizi.admin.service.ProductService;
import com.lizi.admin.util.Constant;
import com.lizi.common.entity.ResponseObject;
import com.lizi.common.entity.ResponsePaginationObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
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
@RequestMapping(value = "/api/v1/products")
@CrossOrigin(origins = "*")
public class ProductController {

  @Autowired
  private ProductService productService;

  @Autowired
  private CloudinaryService cloudinaryService;

  @GetMapping(value = "")
  public ResponseEntity<ResponsePaginationObject> getAll(
      @RequestParam(name = "page", required = false, defaultValue = Constant.PAGE_DEFAULT) int page,
      @RequestParam(name = "size", required = false, defaultValue = Constant.SIZE_DEFAULT) int size) {
    Sort sort = Sort.by(Direction.DESC, "createTime");
    Pageable pageable = PageRequest.of(page - 1, size, sort);
    return ResponseEntity.ok().body(
        ResponsePaginationObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(productService.getAll(pageable))
            .totalCount(productService.getTotalCount(pageable)).build());
  }

  @GetMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> getProduct(@PathVariable(name = "id") Long id) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(productService.getProduct(id)).build());
  }

  @PostMapping(value = "")
  public ResponseEntity<ResponseObject> createProduct(@RequestBody ProductReqDto productReqDto) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(productService.createProduct(productReqDto)).build());
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> updateProduct(@PathVariable(name = "id") Long id,
      @RequestBody ProductUpdateReqDto dto) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(productService.updateProduct(id, dto)).build());
  }

  @PutMapping(value = "/{id}/disable")
  public ResponseEntity<ResponseObject> disableProduct(@PathVariable("id") Long id) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(productService.disableProduct(id)).build());
  }

  @PutMapping(value = "/{id}/enable")
  public ResponseEntity<ResponseObject> enableProduct(@PathVariable("id") Long id) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(productService.enableProduct(id)).build());
  }

  @DeleteMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> deleteProduct(@PathVariable(name = "id") Long id) {
    productService.deleteCategory(id);
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS).build());
  }

  @PostMapping(value = "/image")
  public ResponseEntity<ResponseObject> uploadImageProduct(
      @RequestParam(name = "image") MultipartFile multipartFile) {
    return ResponseEntity.ok().body(ResponseObject.builder().message(Constant.SUCCESS).status(
        HttpStatus.OK).data(cloudinaryService.uploadImageProduct(multipartFile)).build());
  }
}
