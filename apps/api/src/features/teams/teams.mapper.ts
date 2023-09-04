import { PartialTeamDto, TeamDto } from "@meadow/shared";
import { TeamEntity } from "./teams.entity";
import { UsersMapper } from "../users/users.mapper";

export class TeamsMapper {
  static toDto(entity: TeamEntity): TeamDto {
    return {
      id: entity.id,
      name: entity.name,
      imgUrl: entity.imgUrl,
      members: entity.members.map((member) => UsersMapper.toPartialDto(member)),
      spaces: entity.spaces, //TODO
    };
  }

  static toPartialDto(entity: TeamEntity): PartialTeamDto {
    return {
      id: entity.id,
      name: entity.name,
      imgUrl: entity.imgUrl,
    };
  }
}
