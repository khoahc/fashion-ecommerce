package com.lizi.customer.service.implement;

import com.lizi.customer.dto.response.ProductCatalogColorResponseDTO;
import com.lizi.customer.dto.response.ProductCatalogResponseDTO;
import com.lizi.customer.repository.ProductRepository;
import com.lizi.customer.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

  @Autowired
  private ProductRepository productRepository;

  @Override
  public List<ProductCatalogResponseDTO> getAllProductsByCategorySlug(String categorySlug) {
    // color object list of each product is empty
    List<ProductCatalogResponseDTO> productCatalogResponseDTO = productRepository.findAllProductsCatalogByCategorySlug(categorySlug);

    // add color object list into each product
    productCatalogResponseDTO.forEach((element) -> {
      List<ProductCatalogColorResponseDTO> productCatalogColorResponseDTO = productRepository.findProductCatalogColorByProductSlug(categorySlug, element.getSlug());
      element.setColors(productCatalogColorResponseDTO);
    });
    return productCatalogResponseDTO;
  }
}
