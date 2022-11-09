package com.lizi.customer.service;

import com.lizi.customer.dto.request.OrderRequestDTO;
import com.lizi.customer.dto.response.OrderTrackerResponseDTO;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.UUID;

public interface OrderService {
  String addOrder(OrderRequestDTO orderRequestDTO, String siteURL) throws MessagingException, UnsupportedEncodingException;

  boolean verify(String verificationCode);

  boolean checkOrderByOrderIdAndEmail(String id, String email);

  OrderTrackerResponseDTO getOrderTrackerByOrderIdAndEmail(String id, String email);

}
