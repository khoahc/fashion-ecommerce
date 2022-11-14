package com.lizi.customer.dto.response;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductCatalogColorResponseDTO {
  private String name;
  private String slug;
  private String mainImage;
}
