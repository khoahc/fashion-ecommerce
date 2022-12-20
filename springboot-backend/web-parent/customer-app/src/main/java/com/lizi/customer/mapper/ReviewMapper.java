/**
 * 
 */
package com.lizi.customer.mapper;

import com.lizi.common.entity.Review;
import com.lizi.customer.dto.request.ReviewRequestDTO;
import com.lizi.customer.dto.response.ReviewResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

/**
 * @author Dang Khoa Aug 1, 2022
 */

@Mapper(componentModel = "spring")
public interface ReviewMapper {
	ReviewMapper INSTANCE = Mappers.getMapper(ReviewMapper.class);

	@Mapping(target = "headline", source = "entity.headline")
	@Mapping(target = "comment", source = "entity.comment")
	@Mapping(target = "rating", source = "entity.rating")
	@Mapping(target = "fullName", source = "entity.fullName")
	@Mapping(target = "reviewTime", source = "entity.reviewTime")
	@Mapping(target = "bought", source = "entity.bought")
	ReviewResponseDTO reviewToReviewResponseDTO(Review entity);

	@Mapping(target = "headline", source = "dto.headline")
	@Mapping(target = "comment", source = "dto.comment")
	@Mapping(target = "rating", source = "dto.rating")
	@Mapping(target = "fullName", source = "dto.fullName")
	@Mapping(target = "email", source = "dto.email")
	Review reviewRequestDTOToReview(ReviewRequestDTO dto);

}
