package com.lizi.customer.service;


import com.lizi.customer.dto.response.ProductCartResponseDTO;

import java.util.Optional;
import java.util.Set;

public interface ProductOptionService {
  Optional<Set<ProductCartResponseDTO>> getAllProductOptionForCart();

  Long getIdProductOptionBySlugProductAndColorAndSize(String slugProduct, String slugColor, String size);
}
