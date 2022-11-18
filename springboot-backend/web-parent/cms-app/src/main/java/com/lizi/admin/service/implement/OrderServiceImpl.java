package com.lizi.admin.service.implement;

import com.lizi.admin.dto.order.OrderDetailResDto;
import com.lizi.admin.dto.order.OrderResDto;
import com.lizi.admin.dto.orderTrack.OrderTrackResDto;
import com.lizi.admin.dto.product.ProductOrderResDto;
import com.lizi.admin.mapper.OrderMapper;
import com.lizi.admin.mapper.OrderTrackMapper;
import com.lizi.admin.repository.OrderDetailRepository;
import com.lizi.admin.repository.OrderRepository;
import com.lizi.admin.repository.OrderTrackRepository;
import com.lizi.admin.service.OrderService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.lizi.admin.util.Constant;
import com.lizi.common.entity.Order;
import com.lizi.common.entity.OrderStatus;
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
        List<OrderResDto> orderResDtoList = OrderMapper.INSTANCE.entitiesToDtos(orderRepo.findAll());

        return orderResDtoList.stream().map(orderResDto -> {
                    orderResDto.setOrderStatus(orderTrackRepo.findStatusOrderTrackByOrderId(orderResDto.getId()));
                    orderResDto.setVerified(orderTrackRepo.checkStatusOrderTrackByOrderId(orderResDto.getId(), OrderStatus.VERIFIED.name()) == 1);
                    orderResDto.setShipping(orderTrackRepo.checkStatusOrderTrackByOrderId(orderResDto.getId(), OrderStatus.SHIPPING.name()) == 1);
                    orderResDto.setCancelled(orderTrackRepo.checkStatusOrderTrackByOrderId(orderResDto.getId(), OrderStatus.CANCELLED.name()) == 1);
                    return orderResDto;
                }
        ).collect(Collectors.toList());
    }

    @Override
    public OrderDetailResDto getOrderDetailByOrderId(String orderId) {
        Optional<Order> order = Optional.ofNullable(orderRepo.findById(orderId).orElseThrow(
                () -> new ResourceNotFoundException(Constant.NOT_FOUND)));

        List<ProductOrderResDto> productOrderResDtoList = orderDetailRepo.findAllProductsByOrderId(orderId);
        List<OrderTrackResDto> orderTrackResDtoList = orderTrackRepo.findByOrderId(orderId).stream().map((OrderTrackMapper.INSTANCE::OrderTrackToOrderTrackResDto)).toList();

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
                .orderTrackResDtoList(orderTrackResDtoList)
                .products(productOrderResDtoList)
                .build();
    }
}
