import { PartialTeamDto, TeamDto } from "@meadow/shared";
import { TeamEntity } from "./teams.entity";
import { UsersMapper } from "../users/users.mapper";
import { SpacesMapper } from "../spaces/spaces.mapper";

export class TeamsMapper {
  static toDto(entity: TeamEntity): TeamDto {
    return {
      id: entity.id,
      name: entity.name,
      imgUrl: entity.imgUrl,
      members: entity.members.map((member) => UsersMapper.toPartialDto(member)),
      spaces: entity.spaces.map((space) => SpacesMapper.toPartialDto(space)),
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
