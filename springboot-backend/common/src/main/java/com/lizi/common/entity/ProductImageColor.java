package com.lizi.common.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
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
@Entity
@Table(name = "tbl_product_image_colors")
public class ProductImageColor {

  @Id
  @GeneratedValue
  private Long id;

  @OneToOne
  @JoinColumn(name = "image_id")
  private Image image;

  @ManyToOne
  @JoinColumn(name = "product_color_id")
  private ProductColor productColor;

}
