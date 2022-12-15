package com.lizi.admin.service;

import com.lizi.admin.dto.orderTrack.OrderTrackResDto;


public interface OrderTrackService {

// List<> getAllOrderTrackByOrderId();
 OrderTrackResDto addOrderTrackVerifiedByOrderId(String id);

 OrderTrackResDto addOrderTrackPackageByOrderId(String id);
 OrderTrackResDto addOrderTrackCancelledByOrderId(String id);
}
