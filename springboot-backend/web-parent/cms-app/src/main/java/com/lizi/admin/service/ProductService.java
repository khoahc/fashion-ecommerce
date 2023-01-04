package com.lizi.admin.service;

import com.lizi.admin.dto.category.CategoryReqDto;
import com.lizi.admin.dto.product.ProductReqDto;
import com.lizi.admin.dto.product.ProductResDto;
import com.lizi.admin.dto.product.ProductUpdateReqDto;
import com.lizi.common.entity.Product;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface ProductService {

  List<ProductResDto> getAll();
  List<ProductResDto> getAll(Pageable pageable);
  Long getTotalCount(Pageable pageable);

  ProductResDto getProduct(Long id);

  ProductResDto createProduct(ProductReqDto productReqDto);

  ProductResDto updateProduct(Long id, ProductUpdateReqDto dto);
  ProductResDto disableProduct(Long id);
  ProductResDto enableProduct(Long id);

  void deleteCategory(Long id);

  long getQuantityProduct();

  void increasingNumberOfOrder(long id, int quantity);

}
