package com.lizi.customer.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryResponseDTO {

  private String name;
  private String slug;
  private String image;

}
