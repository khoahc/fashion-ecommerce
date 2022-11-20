package com.lizi.admin.dto.category;

import com.fasterxml.jackson.annotation.JsonFormat;
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
public class CategoryResDto {

  private Long id;
  private String name;
  private CategoryResDto parent;
  private String allParentNames;
  private boolean enabled;
  private String image;
  private String slug;

  @JsonFormat(pattern="dd-MM-yyy HH:mm:ss")
  private Date createTime;

  @JsonFormat(pattern="dd-MM-yyy HH:mm:ss")
  private Date updateTime;
}
