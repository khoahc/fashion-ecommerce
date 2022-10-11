package com.lizi.customer.mapper;

import com.lizi.customer.dto.response.ProductCatalogResponseDTO;
import com.lizi.customer.dto.response.ProductDetailResponseDTO;

public interface ProductMapper {
  ProductDetailResponseDTO productToProductDetailResponseDTO();
}
