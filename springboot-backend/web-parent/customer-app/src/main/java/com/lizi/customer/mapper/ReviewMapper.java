/**
 * 
 */
package com.lizi.customer.mapper;

import com.lizi.common.entity.Category;
import com.lizi.common.entity.Review;
import com.lizi.customer.dto.response.CategoryResponseDTO;
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
	@Mapping(target = "firstName", source = "entity.firstName")
	ReviewResponseDTO reviewToReviewResponseDTO(Review entity);

}
