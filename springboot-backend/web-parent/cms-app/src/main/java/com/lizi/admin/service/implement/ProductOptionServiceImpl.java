package com.lizi.admin.service.implement;

import com.lizi.admin.dto.product.ProductOptionReqDto;
import com.lizi.admin.dto.product.ProductOptionResDto;
import com.lizi.admin.mapper.ProductOptionMapper;
import com.lizi.admin.repository.ProductImageColorRepository;
import com.lizi.admin.repository.ProductOptionRepository;
import com.lizi.admin.service.ProductColorService;
import com.lizi.admin.service.ProductOptionService;
import com.lizi.common.entity.Product;
import com.lizi.common.entity.ProductColor;
import com.lizi.common.entity.ProductImageColor;
import com.lizi.common.entity.ProductOption;
import com.lizi.common.exception.ResourceNotFoundException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductOptionServiceImpl implements ProductOptionService {

  @Autowired
  private ProductOptionRepository productOptionRepo;

  @Autowired
  private ProductColorService productColorService;

  @Override
  public List<ProductOption> getAllOptionOfProduct(Long productId) {
    return productOptionRepo.findAllOfProduct(productId);
  }

  @Override
  public ProductOption getProductOption(Long optionId) {
    return productOptionRepo.findById(optionId)
        .orElseThrow(() -> new ResourceNotFoundException("Product option", "id", optionId));
  }

  @Override
  public ProductOption createProductOption(Long productId,
      ProductOptionReqDto productOptionReqDto) {
    return null;
  }

  @Override
  public ProductOption createProductOption(Product product,
      ProductOptionReqDto productOptionReqDto) {
    ProductColor productColor = productColorService.createProductColor(
        productOptionReqDto.getProductColor());

    ProductOption productOption = ProductOption.builder()
        .size(productOptionReqDto.getSize())
        .quantity(productOptionReqDto.getQuantity())
        .product(product)
        .productColor(productColor)
        .build();

    return productOptionRepo.save(productOption);
  }

  @Override
  public Set<ProductOption> createProductOptions(Product product,
      List<ProductOptionReqDto> productOptionReqDtos) {
    return productOptionReqDtos.stream().map(dto -> createProductOption(product, dto)).collect(
        Collectors.toSet());
  }

  @Override
  public ProductOption updateProductOption(Long optionId, ProductOptionReqDto productOptionReqDto) {
    return null;
  }

  @Override
  public void deleteProductOption(Long optionID) {

  }
}
