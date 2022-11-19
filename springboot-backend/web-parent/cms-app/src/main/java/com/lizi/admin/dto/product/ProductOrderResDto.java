package com.lizi.admin.dto.product;

import com.lizi.admin.dto.category.CategoryResDto;
import com.lizi.common.entity.Voucher;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductOrderResDto {
  private String name;
  private String mainImage;
  private String color;
  private String slugColor;
  private String size;
  private BigDecimal price;
  private Integer quantity;
}
