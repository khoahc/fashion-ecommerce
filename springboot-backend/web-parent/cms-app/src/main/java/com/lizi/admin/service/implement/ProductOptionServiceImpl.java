package com.lizi.admin.service.implement;

import com.lizi.admin.dto.product.ProductOptionReqDto;
import com.lizi.admin.dto.product.ProductOptionResDto;
import com.lizi.admin.repository.ProductOptionRepository;
import com.lizi.admin.service.ProductOptionService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductOptionServiceImpl implements ProductOptionService {

  @Autowired
  private ProductOptionRepository productOptionRepo;


  @Override
  public List<ProductOptionResDto> getAllOptionOfProduct(Long productId) {
    return null;
  }

  @Override
  public List<ProductOptionResDto> getProductOption(Long productId, Long optionId) {
    return null;
  }

  @Override
  public ProductOptionResDto createProductOption(Long productID, ProductOptionReqDto productOptionReqDto) {
    return null;
  }

  @Override
  public ProductOptionResDto updateProductOption(Long optionId, ProductOptionReqDto productOptionReqDto) {
    return null;
  }

  @Override
  public void deleteProductOption(Long optionID) {

  }
}
