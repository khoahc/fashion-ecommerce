package com.lizi.admin.service.implement;

import com.lizi.admin.dto.order.OrderResDto;
import com.lizi.admin.mapper.OrderMapper;
import com.lizi.admin.repository.OrderRepository;
import com.lizi.admin.repository.OrderTrackRepository;
import com.lizi.admin.service.DeliveryService;
import com.lizi.common.entity.OrderStatus;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class DeliveryServiceImpl implements DeliveryService {

  @Autowired
  private OrderTrackRepository orderTrackRepo;

  @Override
  public List<OrderResDto> getAllOrder(Pageable pageable) {
    List<OrderResDto> orderResDtoList = OrderMapper.INSTANCE.entitiesToDtos(
        orderTrackRepo.findAllToDeliver(pageable).getContent());

    return orderResDtoList.stream().map(orderResDto -> {
          orderResDto.setOrderStatus(orderTrackRepo.findStatusOrderTrackByOrderId(orderResDto.getId()));
          orderResDto.setVerified(orderTrackRepo.checkStatusOrderTrackByOrderId(orderResDto.getId(),
              OrderStatus.VERIFIED.name()) == 1);
          orderResDto.setShipping(orderTrackRepo.checkStatusOrderTrackByOrderId(orderResDto.getId(),
              OrderStatus.SHIPPING.name()) == 1);
          orderResDto.setCancelled(orderTrackRepo.checkStatusOrderTrackByOrderId(orderResDto.getId(),
              OrderStatus.CANCELLED.name()) == 1);
          return orderResDto;
        }
    ).collect(Collectors.toList());
  }

  @Override
  public Long getTotalCount(Pageable pageable) {
    return orderTrackRepo.findAllToDeliver(pageable).getTotalElements();
  }

  @Override
  public OrderResDto deliveringOrder() {
    return null;
  }

  @Override
  public OrderResDto deliveredOrder() {
    return null;
  }
}
