import { z } from "zod";
import { HasTeamIdSchema, TeamDto } from "..";
import { HasIdSchema } from "../../common/has-id";

export const GetTeamRequestSchema = HasTeamIdSchema;

export type GetTeamRequest = z.infer<typeof HasIdSchema>;

export type GetTeamResponse = TeamDto;
