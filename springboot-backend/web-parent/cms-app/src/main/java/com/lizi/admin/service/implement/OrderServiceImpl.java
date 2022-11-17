package com.lizi.admin.service.implement;

import com.lizi.admin.dto.order.OrderDetailResDto;
import com.lizi.admin.dto.order.OrderResDto;
import com.lizi.admin.dto.product.ProductOrderResDto;
import com.lizi.admin.mapper.OrderMapper;
import com.lizi.admin.repository.OrderDetailRepository;
import com.lizi.admin.repository.OrderRepository;
import com.lizi.admin.repository.OrderTrackRepository;
import com.lizi.admin.service.OrderService;
import java.util.List;
import java.util.Optional;

import com.lizi.admin.util.Constant;
import com.lizi.common.entity.Order;
import com.lizi.common.entity.OrderTrack;
import com.lizi.common.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

  @Autowired
  private OrderRepository orderRepo;

  @Autowired
  private OrderDetailRepository orderDetailRepo;

  @Autowired
  private OrderTrackRepository orderTrackRepo;

  @Override
  public List<OrderResDto> getAllOrders() {
    return OrderMapper.INSTANCE.entitiesToDtos(orderRepo.findAll());
  }

  @Override
  public OrderDetailResDto getOrderDetailByOrderId(String orderId) {
    Optional<Order> order = Optional.ofNullable(orderRepo.findById(orderId).orElseThrow(
            () -> new ResourceNotFoundException(Constant.NOT_FOUND)));

    List<ProductOrderResDto> productOrderResDtoList = orderDetailRepo.findAllProductsByOrderId(orderId);

    String latestOrderStatus = orderTrackRepo.findStatusOrderTrackByOrderId(orderId);


    return OrderDetailResDto.builder()
            .id(order.get().getId())
            .orderTime(order.get().getOrderTime())
            .receiverName(order.get().getReceiverName())
            .phoneNumber(order.get().getPhoneNumber())
            .email(order.get().getEmail())
            .address(order.get().getAddress())
            .shipCost(order.get().getShipCost())
            .totalPrice(order.get().getTotalPrice())
            .paymentMethod(order.get().getPaymentMethod().name())
            .orderStatus(latestOrderStatus)
            .products(productOrderResDtoList)
            .build();
  }
}
