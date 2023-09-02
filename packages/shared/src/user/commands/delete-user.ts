import { z } from "zod";
import { HasIdSchema } from "../../common/has-id";

export const DeleteUserRequestSchema = z.object({
  params: HasIdSchema,
});

export type DeleteUserRequest = z.infer<typeof HasIdSchema>;
