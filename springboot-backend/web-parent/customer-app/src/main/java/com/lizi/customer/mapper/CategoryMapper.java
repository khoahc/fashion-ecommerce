/**
 * 
 */
package com.lizi.customer.mapper;

import com.lizi.common.entity.Category;
import com.lizi.customer.dto.request.CategoryRequestDTO;
import com.lizi.customer.dto.response.CategoryResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * @author Dang Khoa Aug 1, 2022
 */

@Mapper(componentModel = "spring")
public interface CategoryMapper {

	@Mapping(target = "name", source = "entity.name")
	@Mapping(target = "slug", source = "entity.slug")
	@Mapping(target = "image", source = "entity.image.url")
	CategoryResponseDTO categoryToCategoryResponseDTO(Category entity);

}
