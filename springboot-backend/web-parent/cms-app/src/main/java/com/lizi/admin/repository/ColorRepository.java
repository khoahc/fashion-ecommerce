package com.lizi.admin.repository;

import com.lizi.common.entity.Color;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorRepository extends JpaRepository<Color, Long> {

  Optional<Color> findByName(String name);
  boolean existsByName(String name);
}
