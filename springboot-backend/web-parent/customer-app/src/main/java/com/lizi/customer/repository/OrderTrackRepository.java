package com.lizi.customer.repository;

import com.lizi.common.entity.OrderTrack;
import com.lizi.customer.dto.response.OrderTrackResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderTrackRepository extends JpaRepository<OrderTrack, Long> {

  @Query(value = "SELECT new OrderTrack(t.status, t.notes, t.updateTime) " +
          "from OrderTrack t\n" +
          "where t.order.id = :orderId")
  List<OrderTrack> findByOrderId(@Param(value = "orderId") String orderId);
}
