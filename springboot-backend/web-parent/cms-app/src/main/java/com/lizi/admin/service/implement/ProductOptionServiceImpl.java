package com.lizi.admin.service.implement;

import com.lizi.admin.dto.product.ProductColorReqDto;
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
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = {Exception.class, Throwable.class})
public class ProductOptionServiceImpl implements ProductOptionService {

  @Autowired
  private ProductOptionRepository productOptionRepo;

  @Autowired
  private ProductColorService productColorService;
  private ProductColorReqDto productColorReqDto;

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
  public Set<ProductOption> createProductOption(Product product,
      ProductOptionReqDto productOptionReqDto) {

    // create product color
    ProductColorReqDto productColorReqDto = ProductColorReqDto.builder()
        .colorId(productOptionReqDto.getColorId())
        .mainImageId(productOptionReqDto.getMainImageId())
        .imageIds(productOptionReqDto.getImageIds())
        .build();
    ProductColor productColor = productColorService.createProductColor(productColorReqDto);

    Set<ProductOption> rs = productOptionReqDto.getSizes().stream()
        .map(size -> productOptionRepo.save(ProductOption.builder()
            .size(size.getSize()).quantity(size.getQuantity()).product(product)
            .productColor(productColor).build())).collect(Collectors.toSet());

    return rs;
  }

  @Override
  public Set<ProductOption> createProductOptions(Product product,
      List<ProductOptionReqDto> productOptionReqDtos) {
    Set<ProductOption> productOptions = new HashSet<>();

    for (ProductOptionReqDto productOptionReqDto : productOptionReqDtos) {
      productOptions.addAll(createProductOption(product, productOptionReqDto));
    }

    return productOptions;
  }

  @Override
  public ProductOption updateProductOption(Long optionId, ProductOptionReqDto productOptionReqDto) {
    return null;
  }

  @Override
  public void deleteProductOption(Long optionID) {

  }
}
