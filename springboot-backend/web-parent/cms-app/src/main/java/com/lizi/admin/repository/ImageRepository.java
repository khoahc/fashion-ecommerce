package com.lizi.admin.repository;

import com.lizi.common.entity.Image;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

  Optional<Image> findImageByUrl(String url);
}
