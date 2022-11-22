package com.lizi.admin.service;

import com.lizi.admin.dto.order.OrderDetailResDto;
import com.lizi.admin.dto.order.OrderResDto;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface OrderService {

 List<OrderResDto> getAllOrders();
 List<OrderResDto> getAllOrders(Pageable pageable);
 Long getTotalCount(Pageable pageable);

 OrderDetailResDto getOrderDetailByOrderId(String orderId);
}
