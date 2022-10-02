package com.lizi.admin.controller;

import com.lizi.common.entity.ResponseObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/categories")
public class CategoryController {

  @GetMapping(value = "")
  public ResponseEntity<ResponseObject> getAll() {
    return null;
  }

  @GetMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> getCategory(@PathVariable(name = "id") Long id) {
    return null;
  }

  @PostMapping(value = "")
  public ResponseEntity<ResponseObject> createCategory() {
    return null;
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> updateCategory(@PathVariable(name = "id") Long id) {
    return null;
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> deleteCategory(@PathVariable(name = "id") Long id) {
    return null;
  }
}
