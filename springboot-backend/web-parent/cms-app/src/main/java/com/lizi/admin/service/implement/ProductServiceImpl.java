package com.lizi.admin.service.implement;

import com.lizi.admin.dto.product.ProductReqDto;
import com.lizi.admin.dto.product.ProductResDto;
import com.lizi.admin.exception.ResourceNotFoundException;
import com.lizi.admin.mapper.ProductMapper;
import com.lizi.admin.repository.ProductRepository;
import com.lizi.admin.service.ProductService;
import com.lizi.common.entity.Product;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

  @Autowired
  private ProductRepository productRepo;

  @Override
  public List<ProductResDto> getAll() {
    return ProductMapper.INSTANCE.productsToDtos(productRepo.findAll());
  }

  @Override
  public ProductResDto getProduct(Long id) {
    return ProductMapper.INSTANCE.productToDto(productRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("product", "id", id)));
  }

  @Override
  public ProductResDto createProduct(ProductReqDto productReqDto) {
    Product newProduct = ProductMapper.INSTANCE.dtoToProduct(productReqDto);
    return ProductMapper.INSTANCE.productToDto(productRepo.save(newProduct));
  }

  @Override
  public ProductResDto updateProduct(Long id, ProductReqDto productReqDto) {
    Product product = productRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("product", "id", id));
    return ProductMapper.INSTANCE.productToDto(productRepo.save(product));
  }

  @Override
  public void deleteCategory(Long id) {
    productRepo.deleteById(id);
  }
}
