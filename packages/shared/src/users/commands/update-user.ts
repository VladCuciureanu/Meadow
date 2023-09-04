import { z } from "zod";
import { HasUserIdSchema, UserDto } from "..";
import { HasIdSchema } from "../../common/has-id";
import { MutableUserFields } from ".";

const BodySchema = MutableUserFields.partial().strict();

export const UpdateUserRequestSchema = z
  .object({
    body: BodySchema,
  })
  .merge(HasUserIdSchema);

export type UpdateUserRequest = z.infer<typeof BodySchema & typeof HasIdSchema>;

export type UpdateUserResponse = UserDto;
