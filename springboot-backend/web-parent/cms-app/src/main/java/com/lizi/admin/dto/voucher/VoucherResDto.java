package com.lizi.admin.dto.voucher;

import com.lizi.common.entity.DiscountType;
import java.math.BigDecimal;
import java.util.Date;
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
public class VoucherResDto {

  private Long id;
  private String title;
  private String description;
  private BigDecimal discountValue;
  private DiscountType discountType;
  private String couponCode;
  private BigDecimal minimumValueOrder;
  private BigDecimal maximumDiscountAmount;
  private Date startTime;
  private Date expiredTime;

}
