package com.lizi.admin.service.implement;

import com.lizi.admin.dto.product.ProductColorReqDto;
import com.lizi.admin.mapper.ProductColorMapper;
import com.lizi.admin.repository.ProductColorRepository;
import com.lizi.admin.service.ColorService;
import com.lizi.admin.service.ImageService;
import com.lizi.admin.service.ProductColorService;
import com.lizi.admin.service.ProductImageColorService;
import com.lizi.common.entity.Color;
import com.lizi.common.entity.Image;
import com.lizi.common.entity.ProductColor;
import com.lizi.common.entity.ProductImageColor;
import com.lizi.common.exception.ResourceNotFoundException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = {Exception.class, Throwable.class})
public class ProductColorServiceImpl implements ProductColorService {

  @Autowired
  private ProductColorRepository productColorRepo;

  @Autowired
  private ColorService colorService;

  @Autowired
  private ImageService imageService;

  @Autowired
  private ProductImageColorService productImageColorService;

  @Override
  public List<ProductColor> getAll() {
    return productColorRepo.findAll();
  }

  @Override
  public ProductColor getProductColorById(Long id) {
    return productColorRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("product color", "id", id));
  }

  @Override
  public ProductColor createProductColor(ProductColorReqDto dto) {

    // get color
    Color color = colorService.getColorById(dto.getColorId());

    // get image
    Image mainImage = imageService.getImageById(dto.getMainImageId());

    // init product color
    ProductColor productColor = ProductColorMapper.INSTANCE.toEntity(dto);
    productColor.setMainImage(mainImage);
    productColor.setColor(color);

    // save product color
    productColorRepo.save(productColor);

    // create product image colors
    Set<ProductImageColor> productImageColors = dto.getImageIds().stream()
        .map(id -> productImageColorService.createProductImageColor(id, productColor)).collect(
            Collectors.toSet());

    // set product image color for product color
     productColor.setProductImageColors(productImageColors);

    return productColor;
  }

  @Override
  public List<ProductColor> createProductColors(List<ProductColorReqDto> dtos) {
    return dtos.stream().map(dto -> createProductColor(dto)).toList();
  }
}
