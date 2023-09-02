import { z } from "zod";
import { UserDto } from "..";
import { HasIdSchema } from "../../common/has-id";
import { MutableUserFields } from ".";

const BodySchema = MutableUserFields.partial().strict();

export const UpdateUserRequestSchema = z.object({
  params: HasIdSchema,
  body: BodySchema,
});

export type UpdateUserRequest = z.infer<typeof BodySchema & typeof HasIdSchema>;

export type UpdateUserResponse = UserDto;
