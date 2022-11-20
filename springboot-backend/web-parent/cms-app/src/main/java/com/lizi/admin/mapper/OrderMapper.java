package com.lizi.admin.mapper;

import com.lizi.admin.dto.customer.CustomerResDto;
import com.lizi.admin.dto.order.OrderResDto;
import com.lizi.common.entity.Customer;
import com.lizi.common.entity.Order;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OrderMapper {

  OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

  @Mapping(source = "receiverName", target = "receiverName")
  OrderResDto entityToDto(Order order);

  List<OrderResDto> entitiesToDtos(List<Order> orders);
}
