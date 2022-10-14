package com.lizi.customer.repository;

import com.lizi.common.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
  @Query(value = "select * FROM tbl_categories c \n" +
          "WHERE c.all_parent_ids like concat('%', (select id from tbl_categories where slug = :slug) , '%') ", nativeQuery = true)
  List<Category> findMenuCategoryBySlug(@Param(value = "slug") String slug);

  Optional<Category> findBySlugAndEnabledTrue(String slug);

  @Query(value = "select c.slug from tbl_categories c \n" +
          "WHERE c.id = :id ", nativeQuery = true)
  String findSlugById(@Param(value = "id") Long id);

  @Query(value = "select all_parent_ids FROM tbl_categories c \n" +
          "WHERE c.slug = :slug and (enabled is true)", nativeQuery = true)
  String findAllParentIdsBySlugAndEnabledTrue(@Param(value = "slug") String slug);
}
