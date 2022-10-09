/**
 * 
 */
package fa.training.tgdd.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import fa.training.tgdd.dto.request.UserCreationDTO;
import fa.training.tgdd.dto.response.UserResponseDTO;
import fa.training.tgdd.entities.User;
/**
 * @author Dang Khoa Aug 1, 2022
 */

@Mapper(componentModel = "spring")
public interface UserMapper {

	@Mapping(target = "id", source = "entity.id")
	@Mapping(target = "email", source = "entity.email")
	@Mapping(target = "enabled", source = "entity.enabled")
	@Mapping(target = "firstName", source = "entity.firstName")
	@Mapping(target = "lastName", source = "entity.lastName")
	@Mapping(target = "role", source = "entity.role")
	UserResponseDTO userToUserResponseDTO(User entity);

	@Mapping(target = "id", expression = "java(null)")
	@Mapping(target = "email", source = "dto.email")
	@Mapping(target = "enabled", source = "dto.enabled")
	@Mapping(target = "firstName", source = "dto.firstName")
	@Mapping(target = "lastName", source = "dto.lastName")
	@Mapping(target = "password", source = "dto.password")
	@Mapping(target = "photos", expression = "java(null)")
	@Mapping(target = "role.id", source = "dto.roleId")
	User userCreationDTOtoUser(UserCreationDTO dto);

}
