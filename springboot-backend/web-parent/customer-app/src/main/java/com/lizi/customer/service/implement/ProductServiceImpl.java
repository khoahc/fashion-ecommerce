package com.lizi.customer.service.implement;

import com.lizi.common.entity.Product;
import com.lizi.customer.dto.response.*;
import com.lizi.customer.exception.ResourceNotFoundException;
import com.lizi.customer.repository.CategoryRepository;
import com.lizi.customer.repository.ProductRepository;
import com.lizi.customer.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private CategoryRepository categoryRepository;

  @Override
  public Optional<List<ProductCatalogResponseDTO>> getAllProductsByCategorySlug(String categorySlug) {
    // color object list of each product is empty
    Optional<List<ProductCatalogResponseDTO>> productCatalogResponseDTO = productRepository.findAllProductsCatalogByCategorySlug(categorySlug);


    productCatalogResponseDTO.map((list) -> {
      list.forEach((element) -> {
        // add color object list into each product
        Optional<List<ProductCatalogColorResponseDTO>> productCatalogColorResponseDTO = productRepository.findProductCatalogColorByProductSlug(categorySlug, element.getSlugProduct());
        element.setColors(productCatalogColorResponseDTO);

        // add categories into each product
        String allParentIds = categoryRepository.findAllParentIdsBySlugAndEnabledTrue(element.getSlugCategory());
        String[] slugCategoriesArray = Arrays.stream(allParentIds.split("-", 0)).
                filter(e -> e.trim().length() > 0).toArray(String[]::new);

        List<SlugCategoryResponseDTO> slugCategories =
                Arrays.stream(slugCategoriesArray)
                        .map(e -> {
                          return new SlugCategoryResponseDTO(categoryRepository.findSlugById(Long.parseLong(e)));
                        }).toList();
        element.setSlugCategories(slugCategories);

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
    product.get().setImageList(images);

    //set rate average for product
    Double ratingAverage = productRepository.findRatingAverageBySlugProduct(slugProduct);
    if (ratingAverage != null) {
      product.get().setRate(ratingAverage);
    }

    return product;
  }

  @Override
  public Optional<List<SizeResponseDTO>> getAllSizesForProductDetailByProductSlug(String slug) {
    //set sizes for product
    Optional<List<SizeResponseDTO>> sizes = productRepository.findSizesProductBySlugProduct(slug);
    return sizes;
  }
}
