package com.lizi.admin.service;

import com.lizi.admin.dto.order.OrderDetailResDto;
import com.lizi.admin.dto.order.OrderResDto;
import com.lizi.admin.dto.statistic.StatisticPriceDataResDto;

import java.math.BigDecimal;
import java.util.List;

public interface OrderService {

 long getQuantityOrder();

 List<OrderResDto> getAllOrders();

 OrderDetailResDto getOrderDetailByOrderId(String orderId);

 List<StatisticPriceDataResDto> getRevenueOfYear(String year);

 List<StatisticPriceDataResDto> getRevenueOfMonth(String month, String year);

 BigDecimal getTotalRevenue();
}
