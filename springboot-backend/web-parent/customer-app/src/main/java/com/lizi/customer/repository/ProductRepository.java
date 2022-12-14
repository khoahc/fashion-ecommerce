package com.lizi.customer.repository;

import com.lizi.common.entity.Product;
import com.lizi.customer.dto.response.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  //get products
  @Query(value = "SELECT DISTINCT new com.lizi.customer.dto.response.ProductCatalogResponseDTO(p.name, p.slug, c.slug, p.price) \n" +
          "FROM \n" +
          "\tProduct p \n" +
          "INNER JOIN Category c\n" +
          "ON p.category.id = c.id\n" +
          "WHERE (p.name LIKE CONCAT('%', :keyword ,'%'))\n" +
          " OR (c.name LIKE CONCAT('%', :keyword ,'%'))")
  Optional<List<ProductCatalogResponseDTO>> findProducts(@Param("keyword") String keyword);


  //find all product (name, slug and price attribute) by category slug
  @Query(value = "SELECT DISTINCT new com.lizi.customer.dto.response.ProductCatalogResponseDTO(p.name, p.slug, c.slug, p.price) \n" +
          "FROM \n" +
          "\tProduct p \n" +
          "INNER JOIN Category c\n" +
          "ON p.category.id = c.id\n" +
          "WHERE ((c.allParentIds LIKE CONCAT('%-', :idCategory ,'-%'))\n" +
          " OR c.slug = :slugCategory) AND p.enabled = TRUE ")
  Optional<List<ProductCatalogResponseDTO>> findAllProductsCatalogByCategorySlug(@Param("slugCategory") String slug, @Param("idCategory") Integer id);

  //find colors of product (name, slug and image attribute) by category slug and product slug
  @Query(value = "SELECT DISTINCT new com.lizi.customer.dto.response.ProductCatalogColorResponseDTO(color.name, color.slug, img.url) \n" +
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
          "INNER JOIN Color color\n" +
          "ON p_c.color.id = color.id\n" +
          "WHERE p.slug = :slugProduct ORDER BY color.slug ASC")
  Optional<List<ProductCatalogColorResponseDTO>> findProductCatalogColorByProductSlug( @Param("slugProduct") String slugProduct);

  //find product detail
  @Query(value = "SELECT DISTINCT new com.lizi.customer.dto.response.ProductDetailResponseDTO(p.name, p.slug, p.price, p.description) \n" +
          "FROM \n" +
          "\tProduct p \n" +
          "WHERE p.slug = :slugProduct\n")
  Optional<ProductDetailResponseDTO> findProductBySlugAndEnabledTrue(@Param("slugProduct") String slug);

  //find product detail
  @Query(value = "SELECT p \n" +
          "FROM \n" +
          "\tProduct p \n" +
          "WHERE p.slug = :slugProduct and p.enabled = true\n")
  Product findProductBySlug(@Param("slugProduct") String slug);

  //find rating average for product detail
  @Query(value =
          "SELECT avg(r.rating) FROM Review r \n" +
          "\tWHERE r.product.slug = :slugProduct AND (r.enabled = true OR r.bought = true)\n"+
          "\tGROUP BY r.product.slug\n")
  Double findRatingAverageBySlugProduct(@Param("slugProduct") String slugProduct);

  //find main image for product detail
//  @Query(value =
//          "SELECT DISTINCT img.url as main_image \n" +
//                  "FROM \n" +
//                  "\ttbl_products p    \n" +
//                  "    INNER JOIN tbl_product_options p_o\n" +
//                  "    ON p.id = p_o.product_id\n" +
//                  "\tINNER JOIN tbl_product_colors p_c\n" +
//                  "    ON p_o.product_color_id = p_c.id\n" +
//                  "    INNER JOIN tbl_images img\n" +
//                  "    ON p_c.main_image_id = img.id\n" +
//                  "    INNER JOIN tbl_color color\n" +
//                  "    ON p_c.color_id = color.id\n" +
//                  "WHERE p.slug = :slugProduct AND (:slugColor IS NULL OR color.slug = :slugColor) ORDER BY color.slug ASC LIMIT 1", nativeQuery = true )
  @Query(value =
      "SELECT pc.mainImage.url "
          + "FROM Product p "
          + "INNER JOIN p.options ot "
          + "INNER JOIN ot.productColor pc "
          + "INNER JOIN pc.color cl "
          + "WHERE p.slug = :slugProduct "
          + "AND (:slugColor IS NULL OR cl.slug = :slugColor)")
  List<String> findMainImageForProductDetailBySlugProduct(@Param("slugProduct") String slugProduct,
                                                    @Param("slugColor") String slugColor);

  //find all images for product detail
  @Query(value =
          "SELECT DISTINCT new com.lizi.customer.dto.response.ImageResponseDTO(img.url)\n" +
                  "FROM \n" +
                  "\tProduct p    \n" +
                  "    INNER JOIN ProductOption p_o\n" +
                  "    ON p.id = p_o.product.id\n" +
                  "    INNER JOIN ProductColor p_c\n" +
                  "    ON p_o.productColor.id = p_c.id    \n" +
                  "    INNER JOIN ProductImageColor p_i_c\n" +
                  "    ON p_c.id = p_i_c.productColor.id\n" +
                  "    INNER JOIN Image img\n" +
                  "    ON p_i_c.image.id = img.id\n" +
                  "    INNER JOIN Color color\n" +
                  "    ON p_c.color.id = color.id\n" +
                  "WHERE p.slug = :slugProduct AND (:slugColor IS NULL OR color.slug = :slugColor)")
//                  "WHERE p.slug = :slugProduct AND (:slugColor IS NULL OR color.slug = :slugColor) ORDER BY color.slug ASC")
  Optional<List<ImageResponseDTO>> findAllImagesForProductDetailBySlugProduct(@Param("slugProduct") String slugProduct,
                                                    @Param("slugColor") String slugColor);


  //find colors list for product detail
  @Query(value = "SELECT DISTINCT new com.lizi.customer.dto.response.ColorProductDetailResponseDTO(color.name, color.slug, img.url) FROM Product p \n" +
          "\tINNER JOIN ProductOption p_o\n"+
          "\tON p.id = p_o.product.id\n"+
          "\tINNER JOIN ProductColor p_c\n" +
          "\tON p_o.productColor.id = p_c.id\n" +
          "\tINNER JOIN Image img\n" +
          "\tON p_c.mainImage.id = img.id\n" +
          "\tINNER JOIN Color color\n" +
          "\tON p_c.color.id = color.id\n" +
          "WHERE p.slug = :slugProduct \n")
  Optional<List<ColorProductDetailResponseDTO>> findAllColorsProductBySlugProduct(@Param("slugProduct") String slug);

  //find sizes list for product detail
  @Query(value = "SELECT DISTINCT new com.lizi.customer.dto.response.SizeResponseDTO(p_o.size) FROM Product p \n" +
          "\tINNER JOIN ProductOption p_o\n"+
          "\tON p.id = p_o.product.id\n"+
          "\tWHERE p.slug = :slugProduct AND p.isDeleted = false AND p_o.isDeleted = false\n")
  Optional<List<SizeResponseDTO>> findAllSizesProductBySlugProduct(@Param("slugProduct") String slug);

  @Query(value = "SELECT DISTINCT new com.lizi.customer.dto.response.SizeResponseDTO(p_o.size) FROM Product p \n" +
          "\tINNER JOIN ProductOption p_o\n" +
          "\tON p.id = p_o.product.id\n" +
          "\tINNER JOIN ProductColor p_c\n"+
          "\tON p_o.productColor.id = p_c.id\n"+
          "\tINNER JOIN Color c\n" +
          "\tON p_c.color.id = c.id\n" +
          "\tWHERE p.slug = :slugProduct AND c.slug = :slugColor AND p.isDeleted = false AND p_o.isDeleted = false\n")
  Optional<List<SizeResponseDTO>>findAllSizesProductBySlugProductAndSlugColor(@Param("slugProduct") String slugProduct,
                                                                              @Param("slugColor") String slugColor);

  @Query(value = "SELECT p_o.quantity FROM tbl_products p\n" +
          "          INNER JOIN tbl_product_options p_o\n" +
          "          ON p.id = p_o.product_id\n" +
          "          INNER JOIN tbl_product_colors p_c\n" +
          "          ON p_o.product_color_id = p_c.id\n" +
          "          INNER JOIN tbl_color c\n" +
          "          ON p_c.color_id = c.id\n" +
          "          WHERE p.slug = :slugProduct AND c.slug = :slugColor AND p_o.size = :size", nativeQuery = true)
  Integer findQuantityProductBySlugProductSlugColorAndSize(@Param("slugProduct") String slugProduct,
                                                                     @Param("slugColor") String slugColor, @Param("size") String size);


  @Query(value = "Select new com.lizi.customer.dto.response.TopProductDetailResponseDTO(p.name, p.slug, p.cost, p.price) from Product p\n" +
            "WHERE p.enabled = true\n" +
          "ORDER BY p.numberOfOrder DESC")
  List<TopProductDetailResponseDTO> findTopSellingProducts(Pageable pageable);

  @Query(value = "Select new com.lizi.customer.dto.response.TopProductDetailResponseDTO(p.name, p.slug, p.cost, p.price) from Product p\n" +
          "WHERE p.enabled = true\n" +
          "ORDER BY p.createTime DESC")
  List<TopProductDetailResponseDTO> findTopNewProducts(Pageable pageable);

}
