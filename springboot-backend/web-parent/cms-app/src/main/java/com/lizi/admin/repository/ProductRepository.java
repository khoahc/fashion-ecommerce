package com.lizi.admin.repository;

import com.lizi.common.entity.Product;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  Optional<Product> findByName(String name);
  Optional<Product> findBySlug(String slug);
}
