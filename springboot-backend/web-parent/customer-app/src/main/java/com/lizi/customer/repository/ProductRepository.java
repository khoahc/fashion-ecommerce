package com.lizi.customer.repository;

import com.lizi.common.entity.Product;
import com.lizi.customer.dto.response.*;
import org.hibernate.engine.jdbc.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  //find all product (name, slug and price attribute) by category slug
  @Query(value = "SELECT DISTINCT new com.lizi.customer.dto.response.ProductCatalogResponseDTO(p.name, p.slug, c.slug, p.price) \n" +
          "FROM \n" +
          "\tProduct p \n" +
          "INNER JOIN Category c\n" +
          "ON p.category.id = c.id\n" +
          "INNER JOIN ProductOption p_o\n" +
          "ON p.id = p_o.product.id\n" +
          "WHERE c.slug = :slugCategory")
  Optional<List<ProductCatalogResponseDTO>> findAllProductsCatalogByCategorySlug(@Param("slugCategory") String slug);

  //find colors of product (name, slug and image attribute) by category slug and product slug
  @Query(value = "SELECT DISTINCT new com.lizi.customer.dto.response.ProductCatalogColorResponseDTO(p_c.name, p_c.slug, img.url as main_image) \n" +
          "FROM \n" +
          "\tProduct p \n" +
          "INNER JOIN Category c\n" +
          "ON p.category.id = c.id\n" +
          "INNER JOIN ProductOption p_o\n" +
          "ON p.id = p_o.product.id\n" +
          "INNER JOIN ProductColor p_c\n" +
          "ON p_o.productColor.id = p_c.id\n" +
          "INNER JOIN Image img\n" +
          "ON p_c.mainImage.id = img.id\n" +
          "WHERE c.slug = :slugCategory AND p.slug = :slugProduct ORDER BY p_c.slug ASC")
  Optional<List<ProductCatalogColorResponseDTO>> findProductCatalogColorByProductSlug(@Param("slugCategory") String slugCategory, @Param("slugProduct") String slugProduct);

  //find product detail
  @Query(value = "SELECT DISTINCT new com.lizi.customer.dto.response.ProductDetailResponseDTO(p.name, p.slug, p.price, p.description) \n" +
          "FROM \n" +
          "\tProduct p \n" +
          "WHERE p.slug = :slugProduct\n")
  Optional<ProductDetailResponseDTO> findProductBySlugAndEnabledTrue(@Param("slugProduct") String slug);

  //find rating average for product detail
  @Query(value =
          "SELECT avg(r.rating) FROM Review r \n" +
          "\tWHERE r.product.slug = :slugProduct \n"+
          "\tGROUP BY r.product.slug\n")
  Double findRatingAverageBySlugProduct(@Param("slugProduct") String slugProduct);

  //find main image for product detail
  @Query(value =
          "SELECT DISTINCT img.url as main_image \n" +
                  "FROM \n" +
                  "\ttbl_products p    \n" +
                  "    INNER JOIN tbl_product_options p_o\n" +
                  "    ON p.id = p_o.product_id\n" +
                  "\tINNER JOIN tbl_product_colors p_c\n" +
                  "    ON p_o.product_color_id = p_c.id\n" +
                  "    INNER JOIN tbl_images img\n" +
                  "    ON p_c.main_image_id = img.id\n" +
                  " --    INNER JOIN tbl_product_image_colors p_i_c\n" +
                  "--     ON p_c.id = p_i_c.product_color_id\n" +
                  "WHERE p.slug = :slugProduct AND (:slugColor IS NULL OR p_c.slug = :slugColor) ORDER BY p_c.slug ASC LIMIT 1", nativeQuery = true )
  String findMainImageForProductDetailBySlugProduct(@Param("slugProduct") String slugProduct,
                                                    @Param("slugColor") String slugColor);

  //find all images for product detail
  @Query(value =
          "SELECT DISTINCT new com.lizi.customer.dto.response.ImageResponseDTO(img.url)\n" +
                  "FROM \n" +
                  "\tProduct p    \n" +
                  "    INNER JOIN ProductOption p_o\n" +
                  "    ON p.id = p_o.product.id\n" +
                  "\tINNER JOIN ProductColor p_c\n" +
                  "    ON p_o.productColor.id = p_c.id    \n" +
                  "\tINNER JOIN ProductImageColor p_i_c\n" +
                  "\tON p_c.id = p_i_c.productColor.id\n" +
                  "    INNER JOIN Image img\n" +
                  "    ON p_i_c.image.id = img.id\n" +
                  "WHERE p.slug = :slugProduct AND (:slugColor IS NULL OR p_c.slug = :slugColor) ORDER BY p_c.slug ASC")
  Optional<List<ImageResponseDTO>> findAllImagesForProductDetailBySlugProduct(@Param("slugProduct") String slugProduct,
                                                    @Param("slugColor") String slugColor);

  //find size list for product detail
  @Query(value = "SELECT DISTINCT new com.lizi.customer.dto.response.SizeResponseDTO(p_o.size) FROM Product p \n" +
          "\tINNER JOIN ProductOption p_o\n"+
          "\tON p.id = p_o.product.id\n"+
          "\tWHERE p.slug = :slugProduct \n")
  Optional<List<SizeResponseDTO>> findSizesProductBySlugProduct(@Param("slugProduct") String slug);

}
