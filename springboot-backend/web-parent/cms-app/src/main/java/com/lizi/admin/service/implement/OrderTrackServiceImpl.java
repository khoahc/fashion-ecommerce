package com.lizi.admin.service.implement;

import com.lizi.admin.dto.orderTrack.OrderTrackResDto;
import com.lizi.admin.mapper.OrderTrackMapper;
import com.lizi.admin.repository.OrderRepository;
import com.lizi.admin.repository.OrderTrackRepository;
import com.lizi.admin.service.OrderTrackService;
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

    @Override
    public OrderTrackResDto addOrderTrackVerifiedByOrderId(String orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(
                () -> new ResourceNotFoundException(Constant.NOT_FOUND));

        OrderTrack orderTrack = OrderTrack.builder()
                .notes(OrderStatus.VERIFIED.defaultDescription())
                .status(OrderStatus.VERIFIED)
                .order(order)
                .build();
        return OrderTrackMapper.INSTANCE.OrderTrackToOrderTrackResDto(orderTrackRepository.save(orderTrack));
    }

    @Override
    public OrderTrackResDto addOrderTrackShippingByOrderId(String orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(
                    () -> new ResourceNotFoundException(Constant.NOT_FOUND));

        OrderTrack orderTrack = OrderTrack.builder()
                .notes(OrderStatus.SHIPPING.defaultDescription())
                .status(OrderStatus.SHIPPING)
                .order(order)
                .build();
        return OrderTrackMapper.INSTANCE.OrderTrackToOrderTrackResDto(orderTrackRepository.save(orderTrack));
    }

    @Override
    public OrderTrackResDto addOrderTrackCancelledByOrderId(String orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(
                () -> new ResourceNotFoundException(Constant.NOT_FOUND));

        OrderTrack orderTrack = OrderTrack.builder()
                .notes(OrderStatus.CANCELLED.defaultDescription())
                .status(OrderStatus.CANCELLED)
                .order(order)
                .build();
        return OrderTrackMapper.INSTANCE.OrderTrackToOrderTrackResDto(orderTrackRepository.save(orderTrack));
    }

}
