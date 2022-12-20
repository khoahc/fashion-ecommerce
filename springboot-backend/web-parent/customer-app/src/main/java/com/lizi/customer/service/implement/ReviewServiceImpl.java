package com.lizi.customer.service.implement;

import com.lizi.common.entity.Order;
import com.lizi.common.entity.OrderDetail;
import com.lizi.common.entity.Review;
import com.lizi.customer.dto.request.ReviewRequestDTO;
import com.lizi.customer.dto.response.ProductDetailResponseDTO;
import com.lizi.customer.dto.response.ReviewResponseDTO;
import com.lizi.customer.exception.ResourceNotFoundException;
import com.lizi.customer.mapper.ReviewMapper;
import com.lizi.customer.repository.OrderDetailRepository;
import com.lizi.customer.repository.OrderRepository;
import com.lizi.customer.repository.ProductRepository;
import com.lizi.customer.repository.ReviewRepository;
import com.lizi.customer.service.ReviewService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {
  private final ReviewMapper mapper =
          Mappers.getMapper(ReviewMapper.class);

  @Autowired
  private ReviewRepository reviewRepository;
  @Autowired
  private ProductRepository productRepository;
  @Autowired
  private OrderDetailRepository orderDetailRepository;

  @Override
  public List<ReviewResponseDTO> getReviewsByProductSlug(String productSlug) {
    Optional<List<Review>> listReview = reviewRepository.findReviewsByProductSlug(productSlug);

    List<ReviewResponseDTO> listReviewResponseDTO = new ArrayList<>();

    listReview.ifPresent(reviews -> reviews.forEach(item -> {
      listReviewResponseDTO.add(mapper.reviewToReviewResponseDTO(item));
    }));
    return listReviewResponseDTO;
  }

  @Override
  public Optional<ReviewResponseDTO> addReview(ReviewRequestDTO reviewRequestDTO) {
    if(!checkProductSlug(reviewRequestDTO.getProductSlug())) {
      throw new ResourceNotFoundException("The product isn't found!");
    }

    boolean bought = checkBought(reviewRequestDTO.getProductSlug(), reviewRequestDTO.getEmail());

    Review review = Review.builder()
            .headline(reviewRequestDTO.getHeadline())
            .comment(reviewRequestDTO.getComment())
            .email(reviewRequestDTO.getEmail())
            .fullName(reviewRequestDTO.getFullName())
            .rating(reviewRequestDTO.getRating())
            .product(productRepository.findProductBySlug(reviewRequestDTO.getProductSlug()))
            .enabled(false)
            .bought(bought)
            .build();

    Review reviewSaved = reviewRepository.save(review);

    return Optional.ofNullable(mapper.reviewToReviewResponseDTO(reviewSaved));
  }

  private boolean checkBought(String productSlug, String email) {
    Optional<List<OrderDetail>> orderDetails = orderDetailRepository.findByProductSlugAndEmail(productSlug, email);
    return orderDetails.isPresent();
  }

  public boolean checkProductSlug(String productSlug) {
    Optional<ProductDetailResponseDTO> productBySlug = productRepository.findProductBySlugAndEnabledTrue(productSlug);
    return productBySlug.isPresent();
  }
}
