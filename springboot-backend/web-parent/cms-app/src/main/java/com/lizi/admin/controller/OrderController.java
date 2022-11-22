package com.lizi.admin.controller;

import com.lizi.admin.service.OrderService;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/orders")
@CrossOrigin(origins = "*")
public class OrderController {

  @Autowired
  private OrderService orderService;

  @GetMapping(value = "")
  public ResponseEntity<ResponsePaginationObject> getAll(
      @RequestParam(name = "page", required = false, defaultValue = Constant.PAGE_DEFAULT) int page,
      @RequestParam(name = "size", required = false, defaultValue = Constant.SIZE_DEFAULT) int size) {
    Sort sort = Sort.by(Direction.DESC, "orderTime");
    Pageable pageable = PageRequest.of(page - 1, size, sort);
    return ResponseEntity.ok().body(
        ResponsePaginationObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(orderService.getAllOrders(pageable))
            .totalCount(orderService.getTotalCount(pageable)).build());
  }

  @GetMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> getOrderDetailByOrderId(@PathVariable(name = "id") String id) {
    return ResponseEntity.ok().body(
            ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
                    .data(orderService.getOrderDetailByOrderId(id)).build());
  }

}
