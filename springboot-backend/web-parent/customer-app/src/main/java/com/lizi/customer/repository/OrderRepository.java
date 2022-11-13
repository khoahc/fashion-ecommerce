package com.lizi.customer.repository;

import com.lizi.common.entity.Order;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface OrderRepository extends CrudRepository<Order, String> {
  Optional<Order> findByVerificationCode(String verificationCode);

  @Query("UPDATE Order o SET o.verificationCode = null WHERE o.id = ?1")
  @Modifying
  @Transactional
  void enableOrder(String id);

  Optional<Order> findByIdAndEmail(String id, String email);
}
