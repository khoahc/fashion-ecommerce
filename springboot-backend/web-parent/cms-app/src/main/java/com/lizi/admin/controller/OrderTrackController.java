package com.lizi.admin.controller;

import com.lizi.admin.dto.order.OrderIdReqDto;
import com.lizi.admin.service.OrderTrackService;
import com.lizi.admin.util.Constant;
import com.lizi.common.entity.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/order-track")
@CrossOrigin(origins = "*")
public class OrderTrackController {

  @Autowired
  private OrderTrackService orderTrackService;

//  @GetMapping(value = "")
//  public ResponseEntity<ResponseObject> getAllOrderTrackByOrderId(@PathVariable(name = "id") String id) {
//    return ResponseEntity.ok().body(
//        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
//            .data(orderTrackService.getAllOrderTrackByOrderId(id)).build());
  //}

  @PostMapping(value = "/verified")
  public ResponseEntity<ResponseObject> addOrderTrackVerifiedByOrderId(@RequestBody OrderIdReqDto orderIdReqDto) {
    return ResponseEntity.ok().body(
            ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
                    .data(orderTrackService.addOrderTrackVerifiedByOrderId(orderIdReqDto.getOrderId())).build());
  }

  @PostMapping(value = "/package")
  public ResponseEntity<ResponseObject> addOrderTrackShippingByOrderId(@RequestBody OrderIdReqDto orderIdReqDto) {
    return ResponseEntity.ok().body(
            ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
                    .data(orderTrackService.addOrderTrackPackageByOrderId(orderIdReqDto.getOrderId())).build());
  }

  @PostMapping(value = "/cancelled")
  public ResponseEntity<ResponseObject> addOrderTrackCancelledByOrderId(@RequestBody OrderIdReqDto orderIdReqDto) {
    return ResponseEntity.ok().body(
            ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
                    .data(orderTrackService.addOrderTrackCancelledByOrderId(orderIdReqDto.getOrderId())).build());
  }

}
