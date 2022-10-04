package com.lizi.admin.controller;

import com.lizi.admin.dto.category.CategoryReqDto;
import com.lizi.admin.service.CategoryService;
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
@RequestMapping(value = "/api/v1/categories")
public class CategoryController {

  @Autowired
  private CategoryService categoryService;

  @GetMapping(value = "")
  public ResponseEntity<ResponseObject> getAll() {
    return ResponseEntity.ok().body(
        ResponseObject.builder().code(HttpStatus.OK.value()).message(Constant.SUCCESS)
            .data(categoryService.getAll()).build());
  }

  @GetMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> getCategory(@PathVariable(name = "id") Long id) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().code(HttpStatus.OK.value()).message(Constant.SUCCESS)
            .data(categoryService.getCategory(id)).build());
  }

  @PostMapping(value = "")
  public ResponseEntity<ResponseObject> createCategory(@RequestBody CategoryReqDto categoryReqDto) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().code(HttpStatus.OK.value()).message(Constant.SUCCESS)
            .data(categoryService.createCategory(categoryReqDto)).build());
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> updateCategory(@PathVariable(name = "id") Long id,
      @RequestBody CategoryReqDto categoryReqDto) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().code(HttpStatus.OK.value()).message(Constant.SUCCESS)
            .data(categoryService.updateCategory(id, categoryReqDto)).build());
  }

  @DeleteMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> deleteCategory(@PathVariable(name = "id") Long id) {
    categoryService.deleteCategory(id);
    return ResponseEntity.ok().body(
        ResponseObject.builder().code(HttpStatus.OK.value()).message(Constant.SUCCESS).build());
  }
}
