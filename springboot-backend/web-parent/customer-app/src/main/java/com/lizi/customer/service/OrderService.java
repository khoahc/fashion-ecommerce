package com.lizi.customer.service;

import com.lizi.common.entity.Order;
import com.lizi.customer.dto.request.OrderRequestDTO;

import java.util.List;
import java.util.Optional;

public interface OrderService {
  Optional<Order> addOrder(OrderRequestDTO orderRequestDTO);
}
