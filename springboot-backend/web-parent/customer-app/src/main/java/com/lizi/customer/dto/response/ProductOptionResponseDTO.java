package com.lizi.customer.dto.response;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductOptionResponseDTO {
  private Long id;
  private String size;
  private String color;
  private String slugColor;
  private String productName;
  private String slugProduct;
}
