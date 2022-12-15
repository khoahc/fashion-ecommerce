package com.lizi.admin.service;

import com.lizi.admin.dto.order.OrderResDto;
import com.lizi.admin.dto.orderTrack.OrderTrackResDto;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface DeliveryService {

  List<OrderResDto> getAllOrder(Pageable pageable);
  Long getTotalCount(Pageable pageable);
  OrderTrackResDto deliveringOrder(String id);
  OrderTrackResDto deliveredOrder(String id);
}
