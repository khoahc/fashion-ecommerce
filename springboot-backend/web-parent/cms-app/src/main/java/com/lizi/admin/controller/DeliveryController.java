package com.lizi.admin.controller;

import com.lizi.admin.service.DeliveryService;
import com.lizi.admin.util.Constant;
import com.lizi.common.entity.ResponsePaginationObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/deliveries")
@CrossOrigin(origins = "*")
public class DeliveryController {

  @Autowired
  private DeliveryService deliveryService;

  @GetMapping
  public ResponseEntity<ResponsePaginationObject> all(@RequestParam(name = "page", required = false, defaultValue = Constant.PAGE_DEFAULT) int page,
      @RequestParam(name = "size", required = false, defaultValue = Constant.SIZE_DEFAULT) int size) {
    Sort sort = Sort.by(Direction.DESC, "updateTime");
    Pageable pageable = PageRequest.of(page - 1, size, sort);

    return ResponseEntity.ok().body(
        ResponsePaginationObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(deliveryService.getAllOrder(pageable))
            .totalCount(deliveryService.getTotalCount(pageable)).build());
  }

}
