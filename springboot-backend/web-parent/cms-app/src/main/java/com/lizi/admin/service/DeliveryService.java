package com.lizi.admin.service;

import com.lizi.admin.dto.order.OrderResDto;
import com.lizi.admin.dto.orderTrack.OrderTrackResDto;
import java.io.UnsupportedEncodingException;
import java.util.List;
import javax.mail.MessagingException;
import org.springframework.data.domain.Pageable;

public interface DeliveryService {

  List<OrderResDto> getAllOrder(Pageable pageable);
  Long getTotalCount(Pageable pageable);
  OrderTrackResDto deliveringOrder(String id);
  OrderTrackResDto deliveredOrder(String id)
      throws MessagingException, UnsupportedEncodingException;
}
