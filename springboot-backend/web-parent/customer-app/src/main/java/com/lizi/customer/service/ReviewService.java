package com.lizi.customer.service;

import com.lizi.common.entity.Review;
import com.lizi.customer.dto.response.ReviewResponseDTO;

import java.util.List;
import java.util.Optional;

public interface ReviewService {
  Optional<List<ReviewResponseDTO>> getReviewsByProductSlug(String productSlug);
}
