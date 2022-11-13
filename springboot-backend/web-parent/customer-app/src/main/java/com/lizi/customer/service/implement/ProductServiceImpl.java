package com.lizi.customer.service.implement;

import com.lizi.common.entity.Product;
import com.lizi.customer.dto.response.*;
import com.lizi.customer.exception.ResourceNotFoundException;
import com.lizi.customer.repository.CategoryRepository;
import com.lizi.customer.repository.ProductRepository;
import com.lizi.customer.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
  public Optional<List<ProductCatalogResponseDTO>> getProducts(String keyword) {

    Optional<List<ProductCatalogResponseDTO>> productCatalogResponseDTO = productRepository.findProducts(keyword);

    productCatalogResponseDTO.map((list) -> {
      list.forEach((element) -> {
        // add color object list into each product
        Optional<List<ProductCatalogColorResponseDTO>> productCatalogColorResponseDTO = productRepository.findProductCatalogColorByProductSlug(element.getSlugProduct());
        element.setColors(productCatalogColorResponseDTO);

        // add categories into each product
        List<SlugCategoryResponseDTO> slugCategories = new ArrayList<SlugCategoryResponseDTO>();
        Optional<String> allParentIds = categoryRepository.findAllParentIdsBySlugAndEnabledTrue(element.getSlugCategory());

        //add slugCategory current
        slugCategories.add(new SlugCategoryResponseDTO(element.getSlugCategory()));

        //add all slugCategory parent
        if (allParentIds.isPresent()) {
          String[] slugCategoriesArray = Arrays.stream(allParentIds.get().split("-", 0)).
                  filter(e -> e.trim().length() > 0).toArray(String[]::new);

          slugCategories.addAll(Arrays.stream(slugCategoriesArray)
                  .map(e -> {
                    return new SlugCategoryResponseDTO(categoryRepository.findSlugById(Long.parseLong(e)));
                  }).toList());
        }
        element.setSlugCategories(slugCategories);

      });
      return productCatalogResponseDTO;
    });

    return productCatalogResponseDTO;
  }

  @Override
  public Optional<List<ProductCatalogResponseDTO>> getAllProductsByCategorySlug(String categorySlug) {
    // color object list of each product is empty
    Integer categoryId = categoryRepository.findIdBySlug(categorySlug);
    Optional<List<ProductCatalogResponseDTO>> productCatalogResponseDTO = productRepository.findAllProductsCatalogByCategorySlug(categorySlug, categoryId);

    productCatalogResponseDTO.map((list) -> {
      list.forEach((element) -> {
        // add color object list into each product
        Optional<List<ProductCatalogColorResponseDTO>> productCatalogColorResponseDTO = productRepository.findProductCatalogColorByProductSlug(element.getSlugProduct());
        element.setColors(productCatalogColorResponseDTO);

        // add categories into each product
        List<SlugCategoryResponseDTO> slugCategories = new ArrayList<SlugCategoryResponseDTO>();
        Optional<String> allParentIds = categoryRepository.findAllParentIdsBySlugAndEnabledTrue(element.getSlugCategory());

        //add slugCategory current
        slugCategories.add(new SlugCategoryResponseDTO(element.getSlugCategory()));

        //add all slugCategory parent
        if (!allParentIds.isEmpty()) {
          String[] slugCategoriesArray = Arrays.stream(allParentIds.get().split("-", 0)).
                  filter(e -> e.trim().length() > 0).toArray(String[]::new);

          slugCategories.addAll(Arrays.stream(slugCategoriesArray)
                  .map(e -> {
                    return new SlugCategoryResponseDTO(categoryRepository.findSlugById(Long.parseLong(e)));
                  }).toList());
        }
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

    //set all colors for product
    Optional<List<ColorProductDetailResponseDTO>> colors = productRepository.findAllColorsProductBySlugProduct(slugProduct);
    product.get().setColors(colors);

    //we will set all sizes for this product if slugColor is empty else we will get all sizes of the product's that color
    //we will set null for quantity of this product if slugColor or size is empty 
    Optional<List<SizeResponseDTO>> sizes;
    Integer quantity;
    if (slugColor.isEmpty()) {
      sizes = productRepository.findAllSizesProductBySlugProduct(slugProduct);
    } else {
      sizes = productRepository.findAllSizesProductBySlugProductAndSlugColor(slugProduct, slugColor);

      if (!size.isEmpty()) {
        quantity = productRepository.findQuantityProductBySlugProductSlugColorAndSize(slugProduct, slugColor, size);
        product.get().setQuantity(quantity);
      }
    }
    product.get().setSizes(sizes);


    //set rate average for product
    Double ratingAverage = productRepository.findRatingAverageBySlugProduct(slugProduct);
    if (ratingAverage != null) {
      product.get().setRate(ratingAverage);
    }

    return product;
  }

  @Override
  public TopProductsResponseDTO<TopProductDetailResponseDTO> getTopSellingProducts() {
    TopProductsResponseDTO<TopProductDetailResponseDTO> topSellingProducts = new TopProductsResponseDTO<TopProductDetailResponseDTO>();
    topSellingProducts.setTitle("Top sản phẩm bán chạy");

    List<TopProductDetailResponseDTO> data = productRepository.findTopSellingProducts(PageRequest.of(0, 10));
    data.forEach(item -> {
      List<ColorProductDetailResponseDTO> colors = productRepository.findAllColorsProductBySlugProduct(item.getSlug()).get();
      double rating = 0;
      if (productRepository.findRatingAverageBySlugProduct(item.getSlug()) != null) {
        rating = productRepository.findRatingAverageBySlugProduct(item.getSlug());
      }
      item.setRate(rating);
      item.setColors(colors);
    });

    topSellingProducts.setData(data);
    return topSellingProducts;
  }

  @Override
  public TopProductsResponseDTO<TopProductDetailResponseDTO> getTopNewProducts() {
    TopProductsResponseDTO<TopProductDetailResponseDTO> topNewProducts = new TopProductsResponseDTO<TopProductDetailResponseDTO>();
    topNewProducts.setTitle("Top sản phẩm mới");

    List<TopProductDetailResponseDTO> data = productRepository.findTopNewProducts(PageRequest.of(0, 10));
    data.forEach(item -> {
      List<ColorProductDetailResponseDTO> colors = productRepository.findAllColorsProductBySlugProduct(item.getSlug()).get();
      double rating = 0;
      if (productRepository.findRatingAverageBySlugProduct(item.getSlug()) != null) {
        rating = productRepository.findRatingAverageBySlugProduct(item.getSlug());
      }

      item.setRate(rating);
      item.setColors(colors);
    });

    topNewProducts.setData(data);
    return topNewProducts;
  }


//  @Override
//  public Optional<List<SizeResponseDTO>> getAllSizesForProductDetailByProductSlug(String slug) {
//    //set sizes for product
//    Optional<List<SizeResponseDTO>> sizes = productRepository.findAllSizesProductBySlugProduct(slug);
//    return sizes;
//  }
}
