package com.lizi.customer.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopProductsResponseDTO<E> {
  private String title;
  private List<E> data;
}
