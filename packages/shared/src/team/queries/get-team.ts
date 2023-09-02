import { z } from "zod";
import { TeamDto } from "..";
import { HasIdSchema } from "../../common/has-id";

export const GetTeamRequestSchema = z.object({
  params: HasIdSchema,
});

export type GetTeamRequest = z.infer<typeof HasIdSchema>;

export type GetTeamResponse = TeamDto;
