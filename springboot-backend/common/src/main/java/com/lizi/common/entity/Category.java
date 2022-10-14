package com.lizi.common.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;
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
@Entity
@Table(name = "tbl_categories")
public class Category {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 128, nullable = false, unique = true)
  private String name;

  @Column(length = 256, nullable = false, unique = true)
  private String slug;

  private boolean enabled;

  @OneToOne
  @JoinColumn(name = "image_id")
  private Image image;

  @ManyToOne
  @JoinColumn(name = "parent_id")
  private Category parent;

  @Column(length = 256)
  private String allParentIds;

  @OneToMany(mappedBy = "parent")
  @OrderBy("name asc")
  private Set<Category> children = new HashSet<>();

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
      name = "tbl_product_categories_vouchers",
      joinColumns = @JoinColumn(name = "category_id"),
      inverseJoinColumns = @JoinColumn(name = "voucher_id")
  )
  private Set<Voucher> vouchers = new HashSet<>();

  @CreationTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  private Date createTime;

  @UpdateTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  private Date updateTime;

}
