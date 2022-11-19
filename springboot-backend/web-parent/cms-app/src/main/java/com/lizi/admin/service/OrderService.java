package com.lizi.admin.service;

import com.lizi.admin.dto.order.OrderDetailResDto;
import com.lizi.admin.dto.order.OrderResDto;
import java.util.List;

public interface OrderService {

 List<OrderResDto> getAllOrders();

 OrderDetailResDto getOrderDetailByOrderId(String orderId);
}
