package com.lizi.admin.service;

import com.lizi.admin.dto.product.ProductOptionReqDto;
import com.lizi.admin.dto.product.ProductOptionResDto;
import com.lizi.common.entity.Product;
import com.lizi.common.entity.ProductOption;
import java.util.List;
import java.util.Set;

public interface ProductOptionService {

  List<ProductOption> getAllOptionOfProduct(Long productId);

  ProductOption getProductOption(Long optionId);

  ProductOption createProductOption(Long productId, ProductOptionReqDto productOptionReqDto);
  Set<ProductOption> createProductOption(Product product, ProductOptionReqDto productOptionReqDto);
  Set<ProductOption> createProductOptions(Product product, List<ProductOptionReqDto> productOptionReqDtos);

  ProductOption updateProductOption(Long optionId, ProductOptionReqDto productOptionReqDto);

  void deleteProductOption(Long optionId);
}
