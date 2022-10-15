package com.lizi.customer.dto.response;

import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@Builder
public class CategoryIdDTO {
  private String id;

  public CategoryIdDTO(String id) {
    this.id = id;
  }
}
