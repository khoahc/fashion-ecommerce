package com.lizi.admin.repository;

import com.lizi.common.entity.Order;
import java.math.BigDecimal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, String> {

    @Query(value = "SELECT SUM(o.total_price) total\n" +
            "FROM tbl_orders o\n" +
            "WHERE Year(o.order_time) = :year\n" +
            "AND Month(o.order_time) = :month", nativeQuery = true)
    BigDecimal findRevenueOfMonthAndYear(@Param(value = "month") String month, @Param(value = "year") String year);

    @Query(value = "SELECT SUM(o.total_price) total\n" +
            "FROM tbl_orders o\n" +
            "WHERE Year(o.order_time) = :year\n" +
            "AND Month(o.order_time) = :month\n" +
            "AND Day(o.order_time) = :day", nativeQuery = true)
    BigDecimal findRevenueOfDayAndMonthAndYear(@Param(value = "day") String day, @Param(value = "month") String month, @Param(value = "year") String year);


    @Query(value = "SELECT SUM(o.total_price) total\n" +
            "FROM tbl_orders o" , nativeQuery = true)
    BigDecimal findTotalRevenue();

}
