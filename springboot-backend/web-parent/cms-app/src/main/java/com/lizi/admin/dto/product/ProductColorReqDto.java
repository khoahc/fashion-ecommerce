package com.lizi.admin.dto.product;

import java.util.List;
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
public class ProductColorReqDto {
  private Long id;
  private Long colorId;
  private Long mainImageId;
  private List<Long> imageIds;
}
