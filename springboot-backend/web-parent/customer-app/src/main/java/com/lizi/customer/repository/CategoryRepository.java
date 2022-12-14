package com.lizi.customer.repository;

import com.lizi.common.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
  @Query(value = "select * FROM tbl_categories c \n" +
          "WHERE c.all_parent_ids like concat('%-', (select id from tbl_categories where slug = :slug) , '-%') AND c.is_deleted = false", nativeQuery = true)
  List<Category> findMenuCategoryBySlug(@Param(value = "slug") String slug);

  @Query(value = "select c FROM Category c \n" +
          "WHERE c.parent.id IS NULL AND c.isDeleted = false")
  List<Category> findAllRootCategory();

  Optional<Category> findBySlugAndEnabledTrue(String slug);

  @Query(value = "select c.slug from tbl_categories c \n" +
          "WHERE c.id = :id ", nativeQuery = true)
  String findSlugById(@Param(value = "id") Long id);

  @Query(value = "select c.id from tbl_categories c \n" +
          "WHERE c.slug = :slug ", nativeQuery = true)
  Integer findIdBySlug(@Param(value = "slug") String slug);

  @Query(value = "select all_parent_ids FROM tbl_categories c \n" +
          "WHERE c.slug = :slug and (enabled is true)", nativeQuery = true)
  Optional<String> findAllParentIdsBySlugAndEnabledTrue(@Param(value = "slug") String slug);
}
