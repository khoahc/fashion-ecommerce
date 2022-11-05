package com.lizi.customer.repository;

import com.lizi.common.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Repository
public interface DistrictRepository extends JpaRepository<District, Long> {
  @Query(value = "SELECT d FROM District d \n" +
          "\tWHERE d.province.id = :provinceId")
  Optional<List<District>> findByProvinceId(@Param(value = "provinceId") Long provinceId);
}
