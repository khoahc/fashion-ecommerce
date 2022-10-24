package com.lizi.customer.service;

import com.lizi.common.entity.Product;
import com.lizi.customer.dto.response.ProductCatalogResponseDTO;
import com.lizi.customer.dto.response.ProductDetailResponseDTO;
import com.lizi.customer.dto.response.SizeResponseDTO;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductService {

  Optional<List<ProductCatalogResponseDTO>> getAllProductsByCategorySlug(String slug);

  Optional<ProductDetailResponseDTO> getProductDetailBySlug(String slugProduct, String slugColor, String size);

//  Optional<List<SizeResponseDTO>> getAllSizesForProductDetailByProductSlug(String slug);

}
