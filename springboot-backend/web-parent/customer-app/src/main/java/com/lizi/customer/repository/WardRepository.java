package com.lizi.customer.repository;

import com.lizi.common.entity.District;
import com.lizi.common.entity.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WardRepository extends JpaRepository<Ward, Long> {
  @Query(value = "SELECT d FROM Ward d \n" +
          "\tWHERE d.district.id = :districtId")
  Optional<List<Ward>> findByDistrictId(@Param(value = "districtId") Long districtId);
}
