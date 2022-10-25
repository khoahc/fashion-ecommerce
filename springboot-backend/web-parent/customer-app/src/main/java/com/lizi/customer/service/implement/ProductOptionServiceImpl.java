package com.lizi.customer.service.implement;

import com.lizi.customer.dto.response.ProductCartResponseDTO;
import com.lizi.customer.repository.ProductOptionRepository;
import com.lizi.customer.service.ProductOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class ProductOptionServiceImpl implements ProductOptionService {

  @Autowired
  private ProductOptionRepository productOptionRepository;

  @Override
  public Optional<Set<ProductCartResponseDTO>> getAllProductOptionForCart() {
    return productOptionRepository.findAllProductOptionForCart();
  }
}
