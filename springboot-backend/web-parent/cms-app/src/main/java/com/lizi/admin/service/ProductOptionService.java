package com.lizi.admin.service;

import com.lizi.admin.dto.product.ProductOptionReqDto;
import com.lizi.admin.dto.product.ProductOptionResDto;
import java.util.List;

public interface ProductOptionService {

  List<ProductOptionResDto> getAllOptionOfProduct(Long productId);

  List<ProductOptionResDto> getProductOption(Long productId, Long optionId);

  ProductOptionResDto createProductOption(Long productID, ProductOptionReqDto productOptionReqDto);

  ProductOptionResDto updateProductOption(Long optionId, ProductOptionReqDto productOptionReqDto);

  void deleteProductOption(Long optionId);
}
