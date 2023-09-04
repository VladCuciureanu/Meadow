import { PartialSpaceDto, SpaceDto } from "@meadow/shared";
import { SpaceEntity } from "./spaces.entity";
import { TeamsMapper } from "../teams/teams.mapper";
import { FoldersMapper } from "../folders/folders.mapper";

export class SpacesMapper {
  static toDto(entity: SpaceEntity): SpaceDto {
    return {
      id: entity.id,
      name: entity.name,
      imgUrl: entity.imgUrl,
      folders: entity.folders.map((folder) => FoldersMapper.toDto(folder)),
      rootFolderOrder: entity.rootFolderOrder,
      team: TeamsMapper.toPartialDto(entity.team),
    };
  }

  static toPartialDto(entity: SpaceEntity): PartialSpaceDto {
    return {
      id: entity.id,
      name: entity.name,
      imgUrl: entity.imgUrl,
    };
  }
}
