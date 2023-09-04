import { z } from "zod";
import { HasIdSchema } from "../../common/has-id";
import { HasTeamIdSchema } from "..";

export const DeleteTeamRequestSchema = HasTeamIdSchema;

export type DeleteTeamRequest = z.infer<typeof HasIdSchema>;
