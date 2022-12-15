package com.lizi.admin.service;

import com.lizi.admin.dto.order.OrderDetailResDto;
import com.lizi.admin.dto.order.OrderResDto;
import com.lizi.admin.dto.statistic.StatisticPriceDataResDto;

import com.lizi.common.entity.Order;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface OrderService {

 long getQuantityOrder();

 List<OrderResDto> getAllOrders();
 List<OrderResDto> getAllOrders(Pageable pageable);
 Long getTotalCount(Pageable pageable);

 OrderDetailResDto getOrderDetailByOrderId(String orderId);

 List<StatisticPriceDataResDto> getRevenueOfYear(String year);

 List<StatisticPriceDataResDto> getRevenueOfMonth(String month, String year);

 BigDecimal getTotalRevenue();

 Order getOrder(String id);

 void setOrderCheckStatusForOrderResDto(OrderResDto orderResDto);
}
