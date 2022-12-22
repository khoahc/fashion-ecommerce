package com.lizi.admin.service.implement;

import com.lizi.admin.dto.order.OrderResDto;
import com.lizi.admin.dto.orderTrack.OrderTrackResDto;
import com.lizi.admin.mapper.OrderMapper;
import com.lizi.admin.mapper.OrderTrackMapper;
import com.lizi.admin.repository.OrderRepository;
import com.lizi.admin.repository.OrderTrackRepository;
import com.lizi.admin.service.DeliveryService;
import com.lizi.admin.service.OrderService;
import com.lizi.common.entity.Order;
import com.lizi.common.entity.OrderStatus;
import com.lizi.common.entity.OrderTrack;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DeliveryServiceImpl implements DeliveryService {

  @Autowired
  private OrderTrackRepository orderTrackRepo;

  @Autowired
  private OrderService orderService;

  @Override
  @Transactional(propagation = Propagation.REQUIRES_NEW, readOnly = true)
  public List<OrderResDto> getAllOrder(Pageable pageable) {
    List<OrderResDto> orderResDtoList = OrderMapper.INSTANCE.entitiesToDtos(
        orderTrackRepo.findAllToDeliver(pageable).getContent());

    return orderResDtoList.stream().map(orderResDto -> {
          orderResDto.setOrderStatus(orderTrackRepo.findStatusOrderTrackByOrderId(orderResDto.getId()));
          orderService.setOrderCheckStatusForOrderResDto(orderResDto);
          return orderResDto;
        }
    ).collect(Collectors.toList());
  }

  @Override
  @Transactional(propagation = Propagation.REQUIRES_NEW, readOnly = true)
  public Long getTotalCount(Pageable pageable) {
    return orderTrackRepo.findAllToDeliver(pageable).getTotalElements();
  }

  @Override
  public OrderTrackResDto deliveringOrder(String id) {
    Order order = orderService.getOrder(id);

    OrderTrack orderTrack = OrderTrack.builder()
        .notes(OrderStatus.SHIPPING.defaultDescription())
        .status(OrderStatus.SHIPPING).order(order)
        .build();

    return OrderTrackMapper.INSTANCE.OrderTrackToOrderTrackResDto(orderTrackRepo.save(orderTrack));
  }

  @Override
  public OrderTrackResDto deliveredOrder(String id) {
    Order order = orderService.getOrder(id);

    OrderTrack orderTrack = OrderTrack.builder()
        .notes(OrderStatus.DELIVERED.defaultDescription())
        .status(OrderStatus.DELIVERED).order(order)
        .build();

    return OrderTrackMapper.INSTANCE.OrderTrackToOrderTrackResDto(orderTrackRepo.save(orderTrack));
  }
}
