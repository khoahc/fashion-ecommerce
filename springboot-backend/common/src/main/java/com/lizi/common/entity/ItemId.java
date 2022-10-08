package com.lizi.common.entity;

import java.io.Serializable;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemId implements Serializable {

  private Long customerId;

  private Long productOptionId;

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ItemId itemId = (ItemId) o;
    return Objects.equals(customerId, itemId.customerId) && Objects.equals(
        productOptionId, itemId.productOptionId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(customerId, productOptionId);
  }
}
