package com.lizi.customer.service.implement;

import com.lizi.common.entity.Review;
import com.lizi.customer.dto.response.CategoryResponseDTO;
import com.lizi.customer.dto.response.ReviewResponseDTO;
import com.lizi.customer.mapper.CategoryMapper;
import com.lizi.customer.mapper.ReviewMapper;
import com.lizi.customer.repository.ReviewRepository;
import com.lizi.customer.service.ReviewService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {
  private final ReviewMapper mapper =
          Mappers.getMapper(ReviewMapper.class);

  @Autowired
  private ReviewRepository reviewRepository;

  @Override
  public Optional<List<ReviewResponseDTO>> getReviewsByProductSlug(String productSlug) {
    Optional<List<Review>> listReview = reviewRepository.findReviewsByProductSlug(productSlug);

    Optional<List<ReviewResponseDTO>> listReviewResponseDTO = null;

    listReview.get().forEach(item -> {
      listReviewResponseDTO.get().add(mapper.reviewToReviewResponseDTO(item));
    });
    return listReviewResponseDTO;
  }
}
