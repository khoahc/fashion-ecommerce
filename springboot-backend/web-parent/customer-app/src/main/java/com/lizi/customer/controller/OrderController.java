package com.lizi.customer.controller;

import com.lizi.customer.dto.request.OrderRequestDTO;
import com.lizi.customer.dto.response.ResponseObject;
import com.lizi.customer.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping(value ="/api/v1/order")
@CrossOrigin(origins = "http://localhost")
public class OrderController {
  @Autowired
  private OrderService orderService;

  @PostMapping("")
  public ResponseObject addOrder(@Valid @RequestBody OrderRequestDTO orderRequestDTO, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
    return new ResponseObject<>(HttpStatus.OK, "Thành công", orderService.addOrder(orderRequestDTO, getSiteURL(request)));
  }

  @RequestMapping(value = "/verify", method = RequestMethod.GET)
  public ResponseObject verifyOrder(@RequestParam("code") String code) {
    if (orderService.verify(code)) {
      return new ResponseObject<>(HttpStatus.OK, "Thành công", null);
    } else {
      return new ResponseObject<>(HttpStatus.OK, "Thất bại", null);
    }
  }


  private String getSiteURL(HttpServletRequest request) {
    String siteURL = request.getRequestURL().toString();
    return siteURL.replace(request.getServletPath(), "");
  }
}
