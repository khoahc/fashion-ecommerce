package com.lizi.admin.dto.product;

import com.lizi.common.entity.Category;
import com.lizi.common.entity.Image;
import com.lizi.common.entity.ProductOption;
import com.lizi.common.entity.Voucher;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResDto {

  private Long id;
  private String name;
  private String slug;
  private String description;
  private boolean enabled;
  private BigDecimal cost;
  private BigDecimal price;
  private long numberOfOrder;
  private String mainImage;
  private Category category;
  private Set<Voucher> vouchers;

  private Date createTime;
  private Date updateTime;
}
