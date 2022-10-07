package com.lizi.admin.dto.product;

import com.lizi.common.entity.Category;
import com.lizi.common.entity.Voucher;
import java.math.BigDecimal;
import java.util.HashSet;
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
public class ProductReqDto {

  private Long id;
  private String name;
  private String description;
  private boolean enabled;
  private BigDecimal cost;
  private BigDecimal price;
  private long numberOfOrder;
  private Long mainImageId;
  private Long categoryId;
  private Set<Long> vouchersId;
}
