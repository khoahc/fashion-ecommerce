package com.lizi.admin.dto.voucher;

import com.fasterxml.jackson.annotation.JsonFormat;
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
public class VoucherReqDto {

  private Long id;
  private String title;
  private String description;
  private BigDecimal discountValue;
  private DiscountType discountType;
  private String couponCode;
  private BigDecimal minimumValueOrder;
  private BigDecimal maximumDiscountAmount;

  @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
  private Date startTime;

  @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
  private Date expiredTime;

}
