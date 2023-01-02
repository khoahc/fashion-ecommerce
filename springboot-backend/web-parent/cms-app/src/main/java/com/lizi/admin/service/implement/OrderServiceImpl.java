package com.lizi.admin.service.implement;

import com.lizi.admin.dto.order.OrderDetailResDto;
import com.lizi.admin.dto.order.OrderResDto;
import com.lizi.admin.dto.orderTrack.OrderTrackResDto;
import com.lizi.admin.dto.product.ProductOrderResDto;
import com.lizi.admin.dto.statistic.StatisticPriceDataResDto;
import com.lizi.admin.mapper.OrderMapper;
import com.lizi.admin.mapper.OrderTrackMapper;
import com.lizi.admin.repository.OrderDetailRepository;
import com.lizi.admin.repository.OrderRepository;
import com.lizi.admin.repository.OrderTrackRepository;
import com.lizi.admin.service.OrderService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.util.ArrayList;
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
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Pageable;
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
  public long getQuantityOrder() {
    return orderRepo.count();
  }

  @Override
  public List<OrderResDto> getAllOrders() {
    List<OrderResDto> orderResDtoList = OrderMapper.INSTANCE.entitiesToDtos(
        orderRepo.findAll(Sort.by(Sort.Direction.DESC, "orderTime")));

    return orderResDtoList.stream().map(orderResDto -> {
          orderResDto.setOrderStatus(orderTrackRepo.findStatusOrderTrackByOrderId(orderResDto.getId()));
//          orderResDto.setVerified(orderTrackRepo.checkStatusOrderTrackByOrderId(orderResDto.getId(),
//              OrderStatus.VERIFIED.name()) == 1);
//          orderResDto.setShipping(orderTrackRepo.checkStatusOrderTrackByOrderId(orderResDto.getId(),
//              OrderStatus.SHIPPING.name()) == 1);
//          orderResDto.setCancelled(orderTrackRepo.checkStatusOrderTrackByOrderId(orderResDto.getId(),
//              OrderStatus.CANCELLED.name()) == 1);
          setOrderCheckStatusForOrderResDto(orderResDto);
          return orderResDto;
        }
    ).collect(Collectors.toList());
  }

  @Override
  public List<OrderResDto> getAllOrders(Pageable pageable) {
    List<OrderResDto> orderResDtoList = OrderMapper.INSTANCE.entitiesToDtos(
        orderRepo.findAll(pageable).getContent());

    return orderResDtoList.stream().map(orderResDto -> {
          orderResDto.setOrderStatus(orderTrackRepo.findStatusOrderTrackByOrderId(orderResDto.getId()));
//          orderResDto.setVerified(orderTrackRepo.checkStatusOrderTrackByOrderId(orderResDto.getId(),
//              OrderStatus.VERIFIED.name()) == 1);
//          orderResDto.setShipping(orderTrackRepo.checkStatusOrderTrackByOrderId(orderResDto.getId(),
//              OrderStatus.SHIPPING.name()) == 1);
//          orderResDto.setCancelled(orderTrackRepo.checkStatusOrderTrackByOrderId(orderResDto.getId(),
//              OrderStatus.CANCELLED.name()) == 1);
          setOrderCheckStatusForOrderResDto(orderResDto);
          return orderResDto;
        }
    ).collect(Collectors.toList());
  }

  @Override
  public Long getTotalCount(Pageable pageable) {
    return orderRepo.findAll(pageable).getTotalElements();
  }

  @Override
  public List<StatisticPriceDataResDto> getRevenueOfYear(String year) {
    List<StatisticPriceDataResDto> statisticPriceDataResDtoList = new ArrayList<StatisticPriceDataResDto>();
    LocalDate currentdate = LocalDate.now();
    Month currentMonth = currentdate.getMonth();
    Integer currentYear = currentdate.getYear();

    Integer maxMonth = 12;
    if (currentYear == Integer.parseInt(year)) {
      maxMonth = currentMonth.getValue();
    } else if (currentYear < Integer.parseInt(year)) {
      maxMonth = 0;
    }

    for (Integer month = 1; month <= maxMonth; month++) {
      BigDecimal revenueOfMonthAndYear = orderRepo.findRevenueOfMonthAndYear(month.toString(),
          year);
      if (revenueOfMonthAndYear == null) {
        if (Integer.parseInt(year) < currentYear || (Integer.parseInt(year) == currentYear
            && month <= currentMonth.getValue())) {
          revenueOfMonthAndYear = BigDecimal.valueOf(0);
        }
      }
      StatisticPriceDataResDto statisticPriceDataResDto = StatisticPriceDataResDto.builder()
          .title("Tháng " + month)
          .value(revenueOfMonthAndYear)
          .build();
      statisticPriceDataResDtoList.add(statisticPriceDataResDto);
    }

    return statisticPriceDataResDtoList;
  }

  @Override
  public List<StatisticPriceDataResDto> getRevenueOfMonth(String month, String year) {
    List<StatisticPriceDataResDto> statisticPriceDataResDtoList = new ArrayList<>();
    LocalDate currentDate = LocalDate.now();
    Month currentMonth = currentDate.getMonth();
    int currentDay = currentDate.getDayOfMonth();
    int currentYear = currentDate.getYear();

    int maxDay = 31;
    if (currentMonth.getValue() == Integer.parseInt(month)) {
      maxDay = currentDay;
    } else if (currentMonth.getValue() < Integer.parseInt(month)
        && currentYear == Integer.parseInt(year)) {
      maxDay = 0;
    }

    for (int day = 1; day <= maxDay; day++) {
      BigDecimal revenueOfDayAndMonthAndYear = orderRepo.findRevenueOfDayAndMonthAndYear(
          Integer.toString(day), month, year);
      if (revenueOfDayAndMonthAndYear == null) {
        if (Integer.parseInt(month) < currentMonth.getValue()
            || (Integer.parseInt(month) == currentMonth.getValue() && day <= currentDay)
            || (currentYear > Integer.parseInt(year))) {
          revenueOfDayAndMonthAndYear = BigDecimal.valueOf(0);
        }
      }
      StatisticPriceDataResDto statisticPriceDataResDto = StatisticPriceDataResDto.builder()
          .title("Ngày " + day)
          .value(revenueOfDayAndMonthAndYear)
          .build();
      statisticPriceDataResDtoList.add(statisticPriceDataResDto);
    }

    return statisticPriceDataResDtoList;
  }

  @Override
  public BigDecimal getTotalRevenue() {
    return orderRepo.findTotalRevenue();
  }

  @Override
  public Order getOrder(String id) {
    return orderRepo.findById(id).orElseThrow(
        () -> new ResourceNotFoundException(Constant.NOT_FOUND));
  }

  @Override
  public void setOrderCheckStatusForOrderResDto(OrderResDto orderResDto) {
    orderResDto.setVerified(orderTrackRepo.checkStatusOrderTrackByOrderId(orderResDto.getId(),
        OrderStatus.VERIFIED.name()) == 1);
    orderResDto.setPackaged(orderTrackRepo.checkStatusOrderTrackByOrderId(orderResDto.getId(),
        OrderStatus.PACKAGED.name()) == 1);
    orderResDto.setShipping(orderTrackRepo.checkStatusOrderTrackByOrderId(orderResDto.getId(),
        OrderStatus.SHIPPING.name()) == 1);
    orderResDto.setDelivered(orderTrackRepo.checkStatusOrderTrackByOrderId(orderResDto.getId(),
        OrderStatus.DELIVERED.name()) == 1);
    orderResDto.setCancelled(orderTrackRepo.checkStatusOrderTrackByOrderId(orderResDto.getId(),
        OrderStatus.CANCELLED.name()) == 1);
  }

  @Override
  public OrderDetailResDto getOrderDetailByOrderId(String orderId) {
    Optional<Order> order = Optional.ofNullable(orderRepo.findById(orderId).orElseThrow(
        () -> new ResourceNotFoundException(Constant.NOT_FOUND)));

    List<ProductOrderResDto> productOrderResDtoList = orderDetailRepo.findAllProductsByOrderId(
        orderId);
    List<OrderTrackResDto> orderTrackResDtoList = orderTrackRepo.findByOrderId(orderId).stream()
        .map((OrderTrackMapper.INSTANCE::OrderTrackToOrderTrackResDto)).toList();

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
