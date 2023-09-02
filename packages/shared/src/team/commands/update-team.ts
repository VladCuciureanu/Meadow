import { z } from "zod";
import { TeamDto } from "..";
import { HasIdSchema } from "../../common/has-id";
import { MutableTeamFields } from ".";

const BodySchema = MutableTeamFields.partial().strict();

export const UpdateTeamRequestSchema = z.object({
  params: HasIdSchema,
  body: BodySchema,
});

export type UpdateTeamRequest = z.infer<typeof BodySchema & typeof HasIdSchema>;

export type UpdateTeamResponse = TeamDto;
