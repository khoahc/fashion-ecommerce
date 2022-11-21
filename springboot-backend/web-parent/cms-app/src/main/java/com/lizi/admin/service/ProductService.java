package com.lizi.admin.service;

import com.lizi.admin.dto.category.CategoryReqDto;
import com.lizi.admin.dto.product.ProductReqDto;
import com.lizi.admin.dto.product.ProductResDto;
import java.util.List;

public interface ProductService {

  List<ProductResDto> getAll();

  ProductResDto getProduct(Long id);

  ProductResDto createProduct(ProductReqDto productReqDto);

  ProductResDto updateProduct(Long id, ProductReqDto productReqDto);

  void deleteCategory(Long id);

  long getQuantityProduct();

}
