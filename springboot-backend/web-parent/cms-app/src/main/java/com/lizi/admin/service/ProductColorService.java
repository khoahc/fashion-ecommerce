package com.lizi.admin.service;

import com.lizi.admin.dto.product.ProductColorReqDto;
import com.lizi.common.entity.ProductColor;
import java.util.List;

public interface ProductColorService {

  List<ProductColor> getAll();
  ProductColor getProductColorById(Long id);
  ProductColor createProductColor(ProductColorReqDto dto);
  List<ProductColor> createProductColors(List<ProductColorReqDto> dtos);
}
