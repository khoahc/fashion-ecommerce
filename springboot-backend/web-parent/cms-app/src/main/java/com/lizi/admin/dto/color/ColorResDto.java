package com.lizi.admin.dto.color;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ColorResDto {
  private Long id;
  private String name;
  private String slug;
  private String hexCode;
}
