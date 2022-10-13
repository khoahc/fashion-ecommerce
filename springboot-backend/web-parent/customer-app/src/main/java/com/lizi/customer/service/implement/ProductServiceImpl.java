package com.lizi.customer.service.implement;

import com.lizi.common.entity.Product;
import com.lizi.customer.dto.response.*;
import com.lizi.customer.exception.ResourceNotFoundException;
import com.lizi.customer.repository.ProductRepository;
import com.lizi.customer.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

  @Autowired
  private ProductRepository productRepository;

  @Override
  public Optional<List<ProductCatalogResponseDTO>> getAllProductsByCategorySlug(String categorySlug) {
    // color object list of each product is empty
    Optional<List<ProductCatalogResponseDTO>> productCatalogResponseDTO = productRepository.findAllProductsCatalogByCategorySlug(categorySlug);

    // add color object list into each product
    productCatalogResponseDTO.map((list) -> {
      list.forEach((element) -> {
        Optional<List<ProductCatalogColorResponseDTO>> productCatalogColorResponseDTO = productRepository.findProductCatalogColorByProductSlug(categorySlug, element.getSlug());
        element.setColors(productCatalogColorResponseDTO);
      });
      return productCatalogResponseDTO;
    });

    return productCatalogResponseDTO;
  }

  @Override
  public Optional<ProductDetailResponseDTO> getProductDetailBySlug(String slugProduct, String slugColor, String size) {

    Optional<ProductDetailResponseDTO> product = Optional.ofNullable(productRepository.findProductBySlugAndEnabledTrue(slugProduct).orElseThrow(() ->
            new ResourceNotFoundException("Không tìm thấy sản phẩm")));
//    Optional<Product> product = Optional.ofNullable(productRepository.findProductBySlugAndEnabledTrue(slug).orElseThrow(() ->
//            new ResourceNotFoundException("Không tìm thấy sản phẩm")));

    //set mainImage for product
    String mainImage = productRepository.findMainImageForProductDetailBySlugProduct(slugProduct, slugColor);
    product.get().setMainImage(mainImage);

    //set all images for product
    Optional<List<ImageResponseDTO>> images = productRepository.findAllImagesForProductDetailBySlugProduct(slugProduct, slugColor);
    product.get().setImages(images);

    //set rate average for product
    Double ratingAverage = productRepository.findRatingAverageBySlugProduct(slugProduct);
    product.get().setRate(ratingAverage);

    return product;
  }

  @Override
  public Optional<List<SizeResponseDTO>> getAllSizesForProductDetailByProductSlug(String slug) {
    //set sizes for product
    Optional<List<SizeResponseDTO>> sizes = productRepository.findSizesProductBySlugProduct(slug);
    return sizes;
  }
}
