package com.lizi.customer.controller;

import com.lizi.customer.dto.request.OrderRequestDTO;
import com.lizi.customer.dto.response.ResponseObject;
import com.lizi.customer.service.OrderService;
import com.lizi.customer.service.WardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value ="/api/v1/order")
@CrossOrigin(origins = "http://localhost")
public class OrderController {
  @Autowired
  private OrderService orderService;

  @PostMapping("")
  public ResponseObject addOrder(@Valid @RequestBody OrderRequestDTO orderRequestDTO) {
    return new ResponseObject<>(HttpStatus.OK, "Thành công", orderService.addOrder(orderRequestDTO));
  }
}
