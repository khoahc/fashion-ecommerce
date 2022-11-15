package com.lizi.admin.service.implement;

import com.lizi.admin.dto.order.OrderResDto;
import com.lizi.admin.mapper.OrderMapper;
import com.lizi.admin.repository.OrderRepository;
import com.lizi.admin.service.OrderService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

  @Autowired
  private OrderRepository orderRepo;


  @Override
  public List<OrderResDto> getAllOrders() {
    return OrderMapper.INSTANCE.entitiesToDtos(orderRepo.findAll());
  }
}
