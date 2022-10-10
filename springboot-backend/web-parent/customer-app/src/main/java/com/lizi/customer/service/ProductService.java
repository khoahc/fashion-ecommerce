package com.lizi.customer.service;

import com.lizi.customer.dto.response.ProductCatalogResponseDTO;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductService {

  List<ProductCatalogResponseDTO> getAllProductsByCategorySlug(String slug);
}
