import { PartialUserDto, UserDto } from "@meadow/shared";
import { UserEntity } from "./user.entity";

export class UserMapper {
  static toDto(entity: UserEntity): UserDto {
    return {
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      imgUrl: entity.imgUrl,
      teams: entity.teams,
      createdAt: entity.createdAt,
    };
  }

  static toPartialDto(entity: UserEntity): PartialUserDto {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      imgUrl: entity.imgUrl,
    };
  }
}
