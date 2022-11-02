package com.lizi.customer.service.implement;

import com.lizi.common.entity.Order;
import com.lizi.common.entity.OrderDetail;
import com.lizi.customer.dto.request.OrderRequestDTO;
import com.lizi.customer.dto.request.ProductCheckoutRequestDTO;
import com.lizi.customer.mapper.OrderDetailMapper;
import com.lizi.customer.mapper.OrderMapper;
import com.lizi.customer.repository.OrderRepository;
import com.lizi.customer.repository.ProductOptionRepository;
import com.lizi.customer.repository.ProductRepository;
import com.lizi.customer.service.OrderService;
import com.lizi.customer.service.ProductOptionService;
import com.lizi.customer.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
  @Autowired
  private OrderRepository orderRepository;

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  ProductOptionService productOptionService;

  @Autowired
  ProductOptionRepository productOptionRepository;
  @Override
  public Optional<Order> addOrder(OrderRequestDTO orderRequestDTO) {
    Order order = OrderMapper.INSTANCE.orderRequestDTOToOrder(orderRequestDTO);
    Set<ProductCheckoutRequestDTO> listProductCheckoutRequestDTO = orderRequestDTO.getProducts();

    Set<OrderDetail> listOrderDetail = listProductCheckoutRequestDTO.stream().map((item) -> {
      OrderDetail orderDetail = OrderDetailMapper.INSTANCE.productCheckoutRequestDTOToOrderDetail(item);
      Long idProductOption = productOptionService.getIdProductOptionBySlugProductAndColorAndSize(item.getSlugProduct(), item.getSlugColor(), item.getSize());
      orderDetail.setProductOption(productOptionRepository.findById(idProductOption).get());
      return orderDetail;
    }).collect(Collectors.toSet());

    order.setOrderDetails(listOrderDetail);
    return Optional.of(orderRepository.save(order));
  }
}
