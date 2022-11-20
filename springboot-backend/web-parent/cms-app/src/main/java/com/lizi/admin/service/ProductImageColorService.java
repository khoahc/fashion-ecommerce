package com.lizi.admin.service;

import com.lizi.admin.dto.product.ProductColorReqDto;
import com.lizi.common.entity.ProductColor;
import com.lizi.common.entity.ProductImageColor;
import java.util.List;

public interface ProductImageColorService {

  List<ProductImageColor> getAll();
  ProductImageColor getProductImageColor(Long id);
  ProductImageColor createProductImageColor(Long imageId, ProductColor productColor);
}
