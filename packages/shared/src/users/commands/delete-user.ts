import { z } from "zod";
import { HasIdSchema } from "../../common/has-id";
import { HasUserIdSchema } from "..";

export const DeleteUserRequestSchema = HasUserIdSchema;

export type DeleteUserRequest = z.infer<typeof HasIdSchema>;
