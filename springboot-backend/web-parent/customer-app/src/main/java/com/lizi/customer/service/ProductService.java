package com.lizi.customer.service;

import com.lizi.common.entity.Product;
import com.lizi.customer.dto.response.*;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductService {

  Optional<List<ProductCatalogResponseDTO>> getAllProductsByCategorySlug(String slug);
  Optional<List<ProductCatalogResponseDTO>> getProducts(String keyword);

  Optional<ProductDetailResponseDTO> getProductDetailBySlug(String slugProduct, String slugColor, String size);

  TopProductsResponseDTO<TopProductDetailResponseDTO> getTopSellingProducts();

  TopProductsResponseDTO<TopProductDetailResponseDTO> getTopNewProducts();


}
