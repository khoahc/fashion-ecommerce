package com.lizi.admin.service;

import com.lizi.admin.dto.order.OrderResDto;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface DeliveryService {

  List<OrderResDto> getAllOrder(Pageable pageable);
  Long getTotalCount(Pageable pageable);
  OrderResDto deliveringOrder();
  OrderResDto deliveredOrder();
}
