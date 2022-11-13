package com.lizi.admin.service.implement;

import com.lizi.admin.dto.product.ProductColorReqDto;
import com.lizi.admin.mapper.ProductImageColorMapper;
import com.lizi.admin.repository.ProductImageColorRepository;
import com.lizi.admin.service.ColorService;
import com.lizi.admin.service.ImageService;
import com.lizi.admin.service.ProductImageColorService;
import com.lizi.common.entity.Color;
import com.lizi.common.entity.Image;
import com.lizi.common.entity.ProductColor;
import com.lizi.common.entity.ProductImageColor;
import com.lizi.common.exception.ResourceNotFoundException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductImageColorServiceImpl implements ProductImageColorService {

  @Autowired
  private ProductImageColorRepository productImageColorRepo;

  @Autowired
  private ImageService imageService;

  @Override
  public List<ProductImageColor> getAll() {
    return productImageColorRepo.findAll();
  }

  @Override
  public ProductImageColor getProductImageColor(Long id) {
    return productImageColorRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("product image color", "id", id));
  }

  @Override
  public ProductImageColor createProductImageColor(Long imageId, ProductColor productColor) {
    Image image = imageService.getImageById(imageId);

    ProductImageColor productImageColor = ProductImageColor.builder().image(image)
        .productColor(productColor).build();

    return productImageColorRepo.save(productImageColor);
  }
}
