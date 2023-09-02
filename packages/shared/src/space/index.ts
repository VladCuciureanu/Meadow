import { PartialFolderDto } from "../folder";
import { PartialTeamDto } from "../team";

export type SpaceDto = {
  id: string;
  name: string;
  imgUrl?: string;
  folders: PartialFolderDto[];
  rootFolderOrder: string[];
  team: PartialTeamDto;
};

export type PartialSpaceDto = Pick<SpaceDto, "id" | "name" | "imgUrl">;
