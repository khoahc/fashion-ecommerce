package com.lizi.common.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tbl_orders")
public class Order {

  @Id @GeneratedValue(generator="system-uuid")
  @GenericGenerator(name="system-uuid", strategy = "uuid")
  private String id;

  @Column(length = 64, nullable = false)
  private String receiverName;

  @Column(length = 12, nullable = false)
  private String phoneNumber;

  @Column(length = 128, nullable = false)
  private String email;

  @Column(length = 128, nullable = false)
  private String address;

  private BigDecimal shipCost;

  private BigDecimal totalPrice;

  @Enumerated(EnumType.STRING)
  private PaymentMethod paymentMethod;

  @ManyToOne
  @JoinColumn(name = "customer_id")
  private Customer customer;

  @ManyToOne
  @JoinColumn(name = "voucher_id")
  private Voucher voucher;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<OrderDetail> orderDetails = new HashSet<>();

  @CreationTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  private Date orderTime;

  @UpdateTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  private Date updateTime;

  @Column(name = "verification_code", length = 64)
  private String verificationCode;
}
