package com.lizi.admin.repository;

import com.lizi.common.entity.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
  Optional<Category> findByName(String name);

  @Query("SELECT c3 FROM Category c1 JOIN c1.children c2 JOIN c2.children c3")
  List<Category> findAllLevel3();

  @Query("SELECT c FROM Category c WHERE c.allParentIds IS NULL OR LENGTH(c.allParentIds) = 3")
  List<Category> findAllLevel1And2();
}
