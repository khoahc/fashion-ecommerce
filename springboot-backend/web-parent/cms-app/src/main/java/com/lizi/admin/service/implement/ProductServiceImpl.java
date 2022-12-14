package com.lizi.admin.service.implement;

import com.lizi.admin.dto.product.ProductReqDto;
import com.lizi.admin.dto.product.ProductResDto;
import com.lizi.admin.dto.product.ProductUpdateReqDto;
import com.lizi.admin.mapper.ProductMapper;
import com.lizi.admin.repository.CategoryRepository;
import com.lizi.admin.repository.ProductRepository;
import com.lizi.admin.service.ProductOptionService;
import com.lizi.admin.service.ProductService;
import com.lizi.admin.util.Util;
import com.lizi.common.entity.Category;
import com.lizi.common.entity.Product;
import com.lizi.common.entity.ProductOption;
import com.lizi.common.entity.Voucher;
import com.lizi.common.exception.ResourceAlreadyExistsException;
import com.lizi.common.exception.ResourceNotFoundException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = {Exception.class, Throwable.class})
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
  public List<ProductResDto> getAll(Pageable pageable) {
    return ProductMapper.INSTANCE.productsToDtos(productRepo.findAll(pageable).getContent());
  }

  @Override
  public Long getTotalCount(Pageable pageable) {
    return productRepo.findAll(pageable).getTotalElements();
  }

  @Override
  public ProductResDto getProduct(Long id) {
    return ProductMapper.INSTANCE.productToDto(get(id));
  }

  private Product get(Long id) {
    return productRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("product", "id", id));
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

    Product product = ProductMapper.INSTANCE.dtoToProduct(productReqDto);
    product.setCategory(category);
    product.setSlug(slug);

    // save product
    productRepo.save(product);

    // create product options
    Set<ProductOption> productOptions = productOptionService.createProductOptions(product,
        productReqDto.getOptions());
    product.setOptions(productOptions);

    return ProductMapper.INSTANCE.productToDto(product);
  }

  @Override
  public ProductResDto updateProduct(Long id, ProductUpdateReqDto dto) {
    // get product
    Product product = get(id);

    // check unique name
    productRepo.findByName(dto.getName())
        .map(p -> {
          if (!p.equals(product)) {
            throw new ResourceAlreadyExistsException("product", "name", dto.getName());
          }
          return p;
        });

    // get category
    Category category = categoryRepo.findById(dto.getCategoryId()).orElseThrow(
        () -> new ResourceNotFoundException("category", "id", dto.getCategoryId()));

    // generate slug
    String slug = Util.toSlug(dto.getName());

    // update data product
    ProductMapper.INSTANCE.updateProductFromDto(dto, product);
    product.setCategory(category);
    product.setSlug(slug);

    return ProductMapper.INSTANCE.productToDto(productRepo.save(product));
  }

  @Override
  public ProductResDto disableProduct(Long id) {
    Product product = get(id);
    product.setEnabled(false);
    return ProductMapper.INSTANCE.productToDto(productRepo.save(product));
  }

  @Override
  public ProductResDto enableProduct(Long id) {
    Product product = get(id);
    product.setEnabled(true);
    return ProductMapper.INSTANCE.productToDto(productRepo.save(product));
  }

  @Override
  public void deleteCategory(Long id) {
    productRepo.deleteById(id);
  }

  @Override
  public long getQuantityProduct() {
    return productRepo.count();
  }

  @Override
  public void increasingNumberOfOrder(long id, int quantity) {
    Product product = get(id);
    product.setNumberOfOrder(product.getNumberOfOrder() + quantity);

    productRepo.save(product);
  }

}
