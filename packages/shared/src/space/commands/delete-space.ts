import { z } from "zod";
import { HasIdSchema } from "../../common/has-id";

export const DeleteSpaceRequestSchema = z.object({
  params: HasIdSchema,
});

export type DeleteSpaceRequest = z.infer<typeof HasIdSchema>;
