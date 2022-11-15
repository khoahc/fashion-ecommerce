package com.lizi.admin.controller;

import com.lizi.admin.service.OrderService;
import com.lizi.admin.util.Constant;
import com.lizi.common.entity.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/orders")
@CrossOrigin(origins = "*")
public class OrderController {

  @Autowired
  private OrderService orderService;

  @GetMapping(value = "")
  public ResponseEntity<ResponseObject> getAll() {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(orderService.getAllOrders()).build());
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
