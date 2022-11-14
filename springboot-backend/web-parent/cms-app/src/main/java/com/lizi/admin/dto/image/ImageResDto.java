package com.lizi.admin.dto.image;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImageResDto {

  private Long id;
  private String url;
  private String cloudinaryId;
}
