package com.lizi.common.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_tracks")
public class OrderTrack {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 256)
  private String notes;

  @Enumerated(EnumType.STRING)
  @Column(length = 48, nullable = false)
  private OrderStatus status;

  @Temporal(TemporalType.TIMESTAMP)
  @UpdateTimestamp
  private Date updateTime;

  @ManyToOne
  @JoinColumn(name = "order_id")
  private Order order;
}
