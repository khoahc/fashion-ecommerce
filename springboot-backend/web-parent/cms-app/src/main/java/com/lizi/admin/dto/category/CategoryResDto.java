package com.lizi.admin.dto.category;

import com.lizi.common.entity.Category;
import com.lizi.common.entity.Image;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
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
  private boolean enabled;
  private String image;
}
