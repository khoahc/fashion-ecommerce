package com.lizi.admin.controller;

import com.lizi.common.entity.ResponseObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/orders")
public class OrderController {

  @GetMapping(value = "")
  public ResponseEntity<ResponseObject> getAll() {
    return null;
  }

  @GetMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> getOrder(@PathVariable(name = "id") Long id) {
    return null;
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> updateOrder(@PathVariable(name = "id") Long id) {
    return null;
  }

  @DeleteMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> deleteOrder(@PathVariable(name = "id") Long id) {
    return null;
  }
}
