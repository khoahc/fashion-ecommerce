package com.lizi.admin.repository;

import com.lizi.admin.dto.product.ProductOrderResDto;
import com.lizi.common.entity.Order;
import com.lizi.common.entity.OrderDetail;
import com.lizi.common.entity.OrderTrack;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderTrackRepository extends JpaRepository<OrderTrack, Long> {
    @Query(value = "SELECT o_t.notes FROM tbl_tracks o_t WHERE o_t.order_id = :orderId order by o_t.update_time desc limit 1", nativeQuery = true)
    String findStatusOrderTrackByOrderId(@Param(value = "orderId") String orderId);

    @Query(value = "SELECT * FROM tbl_tracks o_t WHERE o_t.order_id = :orderId order by o_t.update_time asc", nativeQuery = true)
    List<OrderTrack> findByOrderId(@Param(value = "orderId") String orderId);

    @Query(value = "SELECT EXISTS(SELECT * FROM tbl_tracks o_t WHERE o_t.order_id = :orderId AND o_t.status = :status)", nativeQuery = true)
    Integer checkStatusOrderTrackByOrderId(@Param(value = "orderId") String orderId, @Param(value = "status") String status);

    @Query("SELECT DISTINCT o FROM OrderTrack ot "
        + "INNER JOIN ot.order o "
        + "WHERE ot.status = com.lizi.common.entity.OrderStatus.PACKAGED OR ot.status = com.lizi.common.entity.OrderStatus.SHIPPING")
    Page<Order> findAllToDeliver(Pageable pageable);

}
