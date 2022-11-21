package com.lizi.admin.controller;

import com.lizi.admin.service.OrderService;
import com.lizi.admin.service.ProductService;
import com.lizi.admin.util.Constant;
import com.lizi.common.entity.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

@RestController
@RequestMapping(value = "/api/v1/statistic")
@CrossOrigin(origins = "*")
public class StatisticController {

  @Autowired
  private OrderService orderService;

  @Autowired
  private ProductService productService;

  @GetMapping(value = "/revenue-year/{year}")
  public ResponseEntity<ResponseObject> getRevenueOfYear(@PathVariable(value = "year") String year) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(orderService.getRevenueOfYear(year)).build());
  }

  @GetMapping(value = "/revenue-month")
  public ResponseEntity<ResponseObject> getRevenueOfMonth(@PathParam(value = "month") String month,
                                                          @PathParam(value = "year") String year) {
    return ResponseEntity.ok().body(
            ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
                    .data(orderService.getRevenueOfMonth(month, year)).build());
  }

  @GetMapping(value = "/quantity-product")
  public ResponseEntity<ResponseObject> getQuantityProduct() {
    return ResponseEntity.ok().body(
            ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
                    .data(productService.getQuantityProduct()).build());
  }

  @GetMapping(value = "/quantity-order")
  public ResponseEntity<ResponseObject> getQuantityOrder() {
    return ResponseEntity.ok().body(
            ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
                    .data(orderService.getQuantityOrder()).build());
  }

  @GetMapping(value = "/total-revenue")
  public ResponseEntity<ResponseObject> getTotalRevenue() {
    return ResponseEntity.ok().body(
            ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
                    .data(orderService.getTotalRevenue()).build());
  }


}
