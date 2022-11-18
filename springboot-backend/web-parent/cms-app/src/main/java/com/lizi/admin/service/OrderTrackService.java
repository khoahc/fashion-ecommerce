package com.lizi.admin.service;

import com.lizi.admin.dto.orderTrack.OrderTrackResDto;
import org.springframework.stereotype.Service;


public interface OrderTrackService {

// List<> getAllOrderTrackByOrderId();
 OrderTrackResDto addOrderTrackVerifiedByOrderId(String id);

 OrderTrackResDto addOrderTrackShippingByOrderId(String id);
 OrderTrackResDto addOrderTrackCancelledByOrderId(String id);
}
