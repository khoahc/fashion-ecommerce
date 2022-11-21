package com.lizi.admin.dto.statistic;

import lombok.*;

import java.math.BigDecimal;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatisticPriceDataResDto {
    private String title;
    private BigDecimal value;
}
