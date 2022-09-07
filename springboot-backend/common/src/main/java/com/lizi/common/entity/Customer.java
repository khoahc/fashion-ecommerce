package com.lizi.common.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_customers")
public class Customer {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 40, nullable = false)
  private String firstName;

  @Column(length = 40, nullable = false)
  private String lastName;

  @Column(length = 12, nullable = false, unique = true)
  private String phoneNumber;

  @Column(length = 128, nullable = false, unique = true)
  private String email;

  @Column(length = 128, nullable = false)
  private String password;

  private boolean enabled;

  @Column(length = 128, nullable = false)
  private String address;

  @Enumerated(EnumType.STRING)
  @Column(length = 10)
  private AuthenticationType authenticationType;

  @Column(length = 30)
  private String resetPasswordToken;

  @Column(length = 64)
  private String verificationCode;

  @CreationTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  private Date createTime;

  @UpdateTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  private Date updateTime;
}
