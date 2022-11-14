package com.lizi.admin.dto.category;

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
public class CategoryReqDto {

  private Long id;
  private String name;
  private boolean enabled;
  private Long imageId;
  private Long parentId;
}
