package com.lizi.customer.service;

import com.lizi.customer.dto.request.OrderRequestDTO;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.UUID;

public interface OrderService {
  String addOrder(OrderRequestDTO orderRequestDTO, String siteURL) throws MessagingException, UnsupportedEncodingException;

  boolean verify(String verificationCode);
}
