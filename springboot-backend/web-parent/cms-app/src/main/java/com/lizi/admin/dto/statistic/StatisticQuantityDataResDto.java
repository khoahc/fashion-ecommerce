package com.lizi.admin.dto.statistic;

import lombok.*;

import java.math.BigDecimal;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatisticQuantityDataResDto {
    private String title;
    private Integer value;
}
