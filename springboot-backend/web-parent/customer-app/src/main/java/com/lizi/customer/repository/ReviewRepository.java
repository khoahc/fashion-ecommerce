package com.lizi.customer.repository;

import com.lizi.common.entity.Review;
import com.lizi.common.entity.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
  @Query(value = "SELECT r FROM Review r \n" +
          "\tWHERE r.product.slug = :productSlug and (r.enabled = true OR r.bought = true)")
  Optional<List<Review>> findReviewsByProductSlug(@Param(value = "productSlug") String productSlug);
}
