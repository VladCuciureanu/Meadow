import { z } from "zod";
import { TeamDto } from "..";
import { MutableTeamFields } from ".";

const BodySchema = MutableTeamFields.strict();

export const CreateTeamRequestSchema = z.object({
  body: BodySchema,
});

export type CreateTeamRequest = z.infer<typeof BodySchema>;

export type CreateTeamResponse = TeamDto;
