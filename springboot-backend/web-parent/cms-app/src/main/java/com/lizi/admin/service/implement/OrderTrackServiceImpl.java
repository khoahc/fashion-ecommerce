package com.lizi.admin.service.implement;

import com.lizi.admin.dto.orderTrack.OrderTrackResDto;
import com.lizi.admin.mapper.OrderTrackMapper;
import com.lizi.admin.repository.OrderRepository;
import com.lizi.admin.repository.OrderTrackRepository;
import com.lizi.admin.service.OrderTrackService;
import com.lizi.admin.service.ProductOptionService;
import com.lizi.admin.service.ProductService;
import com.lizi.admin.util.Constant;
import com.lizi.admin.util.DateFormat;
import com.lizi.common.entity.Order;
import com.lizi.common.entity.OrderStatus;
import com.lizi.common.entity.OrderTrack;
import com.lizi.common.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;

@Service
public class OrderTrackServiceImpl implements OrderTrackService {

  @Autowired
  private OrderTrackRepository orderTrackRepository;

  @Autowired
  private OrderRepository orderRepository;

  @Autowired
  private ProductOptionService productOptionService;

  @Autowired
  private ProductService productService;

  @Override
  public OrderTrackResDto addOrderTrackVerifiedByOrderId(String orderId) {
    Order order = orderRepository.findById(orderId)
        .orElseThrow(() -> new ResourceNotFoundException(Constant.NOT_FOUND));

    order.getOrderDetails().stream().forEach(odt -> {
      productOptionService.decreasingQuantity(odt.getProductOption().getId(), odt.getQuantity());
      productService.increasingNumberOfOrder(odt.getProductOption().getProduct().getId(),
          odt.getQuantity());
    });

    OrderTrack orderTrack = OrderTrack.builder().notes(OrderStatus.VERIFIED.defaultDescription())
        .status(OrderStatus.VERIFIED).order(order).build();
    return OrderTrackMapper.INSTANCE.OrderTrackToOrderTrackResDto(
        orderTrackRepository.save(orderTrack));
  }

  @Override
  public OrderTrackResDto addOrderTrackPackageByOrderId(String orderId) {
    Order order = orderRepository.findById(orderId)
        .orElseThrow(() -> new ResourceNotFoundException(Constant.NOT_FOUND));

    OrderTrack orderTrack = OrderTrack.builder().notes(OrderStatus.PACKAGED.defaultDescription())
        .status(OrderStatus.PACKAGED).order(order).build();
    return OrderTrackMapper.INSTANCE.OrderTrackToOrderTrackResDto(
        orderTrackRepository.save(orderTrack));
  }

  @Override
  public OrderTrackResDto addOrderTrackCancelledByOrderId(String orderId) {
    Order order = orderRepository.findById(orderId)
        .orElseThrow(() -> new ResourceNotFoundException(Constant.NOT_FOUND));

    OrderTrack orderTrack = OrderTrack.builder().notes(OrderStatus.CANCELLED.defaultDescription())
        .status(OrderStatus.CANCELLED).order(order).build();
    return OrderTrackMapper.INSTANCE.OrderTrackToOrderTrackResDto(
        orderTrackRepository.save(orderTrack));
  }

}
