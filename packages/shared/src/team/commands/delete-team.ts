import { z } from "zod";
import { HasIdSchema } from "../../common/has-id";

export const DeleteTeamRequestSchema = z.object({
  params: HasIdSchema,
});

export type DeleteTeamRequest = z.infer<typeof HasIdSchema>;
