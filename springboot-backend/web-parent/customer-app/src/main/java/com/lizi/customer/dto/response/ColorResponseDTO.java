package com.lizi.customer.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ColorResponseDTO {
  private String name;
  private String slug;
  private String hexCode;
}
