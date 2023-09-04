import { z } from "zod";
import { PartialSpaceDto } from "../spaces";
import { PartialUserDto } from "../users";

export type TeamDto = {
  id: string;
  name: string;
  imgUrl?: string;
  members: PartialUserDto[];
  spaces: PartialSpaceDto[];
};

export type PartialTeamDto = Pick<TeamDto, "id" | "name" | "imgUrl">;

export const HasTeamIdSchema = z.object({
  params: z.object({
    teamId: z.string().uuid(),
  }),
});

export * from "./commands";
export * from "./commands/create-team";
export * from "./commands/update-team";
export * from "./commands/delete-team";
export * from "./queries/get-team";
export * from "./queries/get-teams";
