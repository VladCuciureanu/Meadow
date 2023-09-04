import { PartialUserDto, UserDto } from "@meadow/shared";
import { UserEntity } from "./users.entity";
import { TeamsMapper } from "../teams/teams.mapper";

export class UsersMapper {
  static toDto(entity: UserEntity): UserDto {
    return {
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      imgUrl: entity.imgUrl,
      teams: entity.teams.map((team) => TeamsMapper.toPartialDto(team)),
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
