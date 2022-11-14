package com.lizi.admin.dto.product;

import com.lizi.common.entity.Color;
import java.util.Date;
import java.util.Set;
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
public class ProductOptionResDto {
  private Long id;
  private String size;
  private int quantity;
  private Color color;
  private String mainImage;
  private Set<String> images;
  private Date createTime;
  private Date updateTime;
}
