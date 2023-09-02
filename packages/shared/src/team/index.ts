import { PartialSpaceDto } from "../space";
import { PartialUserDto } from "../user";

export type TeamDto = {
  id: string;
  name: string;
  imgUrl?: string;
  members: PartialUserDto[];
  spaces: PartialSpaceDto[];
};

export type PartialTeamDto = Pick<TeamDto, "id" | "name" | "imgUrl">;
