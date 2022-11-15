package com.lizi.admin.controller;

import com.lizi.admin.service.RoleService;
import com.lizi.admin.util.Constant;
import com.lizi.common.entity.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping( value = "/api/v1/roles")
@CrossOrigin(origins = "*")
public class RoleController {

  @Autowired
  private RoleService roleService;

  @GetMapping(value = "")
  public ResponseEntity<ResponseObject> getAll() {
    return ResponseEntity.ok().body(ResponseObject.builder().status(HttpStatus.OK).message(
        Constant.SUCCESS).data(roleService.getAll()).build());
  }
}
