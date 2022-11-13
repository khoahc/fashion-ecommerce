package com.lizi.admin.service.implement;

import com.lizi.admin.dto.product.ProductReqDto;
import com.lizi.admin.dto.product.ProductResDto;
import com.lizi.admin.mapper.ProductMapper;
import com.lizi.admin.repository.CategoryRepository;
import com.lizi.admin.repository.ProductOptionRepository;
import com.lizi.admin.repository.ProductRepository;
import com.lizi.admin.service.ProductOptionService;
import com.lizi.admin.service.ProductService;
import com.lizi.admin.util.Util;
import com.lizi.common.entity.Category;
import com.lizi.common.entity.Product;
import com.lizi.common.exception.ResourceAlreadyExistsException;
import com.lizi.common.exception.ResourceNotFoundException;
import java.util.List;
import java.util.Objects;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

  @Autowired
  private ProductRepository productRepo;

  @Autowired
  private ProductOptionService productOptionService;

  @Autowired
  private CategoryRepository categoryRepo;

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
    // check unique name
    if (productRepo.findByName(productReqDto.getName()).isPresent()) {
      throw new ResourceAlreadyExistsException("product", "name", productReqDto.getName());
    }

    // get category
    Category category = categoryRepo.findById(productReqDto.getCategoryId()).orElseThrow(
        () -> new ResourceNotFoundException("category", "id", productReqDto.getCategoryId()));

    // generate slug
    String slug = Util.toSlug(productReqDto.getName());

    Product newProduct = ProductMapper.INSTANCE.dtoToProduct(productReqDto);
    newProduct.setCategory(category);
    newProduct.setSlug(slug);
    productRepo.save(newProduct);

    productOptionService.createProductOptions(newProduct, productReqDto.getOptions());

    return ProductMapper.INSTANCE.productToDto(newProduct);
  }

  @Override
  public ProductResDto updateProduct(Long id, ProductReqDto productReqDto) {
    // get product
    Product product = productRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("product", "id", id));

    // check unique name
    productRepo.findByName(productReqDto.getName())
        .map(p -> {
          if (!p.equals(product)) {
            throw new ResourceAlreadyExistsException("product", "name", productReqDto.getName());
          }
          return p;
        });

    // get category
    Category category = categoryRepo.findById(productReqDto.getCategoryId()).orElseThrow(
        () -> new ResourceNotFoundException("category", "id", productReqDto.getCategoryId()));

    // generate slug
    String slug = Util.toSlug(productReqDto.getName());

    // update data product
    ProductMapper.INSTANCE.updateProductFromDto(productReqDto, product);
    product.setCategory(category);
    product.setSlug(slug);

    return ProductMapper.INSTANCE.productToDto(productRepo.save(product));
  }

  @Override
  public void deleteCategory(Long id) {
    productRepo.deleteById(id);
  }
}
