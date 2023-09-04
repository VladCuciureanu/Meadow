import { z } from "zod";
import { PartialFolderDto } from "../folders";
import { PartialTeamDto } from "../teams";

export type SpaceDto = {
  id: string;
  name: string;
  imgUrl?: string;
  folders: PartialFolderDto[];
  rootFolderOrder: string[];
  team: PartialTeamDto;
};

export type PartialSpaceDto = Pick<SpaceDto, "id" | "name" | "imgUrl">;

export const HasSpaceIdSchema = z.object({
  params: z.object({
    spaceId: z.string().uuid(),
  }),
});

export * from "./commands";
export * from "./commands/create-space";
export * from "./commands/update-space";
export * from "./commands/delete-space";
export * from "./queries/get-space";
export * from "./queries/get-spaces";
