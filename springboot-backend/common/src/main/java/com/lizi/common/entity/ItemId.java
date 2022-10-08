package com.lizi.common.entity;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ItemId implements Serializable {

  @ManyToOne(optional = false)
  @JoinColumn(name = "customer_id", nullable = false)
  private Customer customer;

  @ManyToOne(optional = false)
  @JoinColumn(name = "product_option_id", nullable = false)
  private Customer productOption;

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ItemId itemId = (ItemId) o;
    return Objects.equals(customer, itemId.customer) && Objects.equals(
        productOption, itemId.productOption);
  }

  @Override
  public int hashCode() {
    return Objects.hash(customer.getId(), productOption.getId());
  }
}
