package com.lizi.customer.repository;

import com.lizi.common.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
  Optional<Category> findCategoryIdBySlug(String slug);

  Optional<Category> findBySlugAndEnabledTrue(String slug);
}
