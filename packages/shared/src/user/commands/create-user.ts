import { z } from "zod";
import { UserDto } from "..";
import { MutableUserFields } from ".";

const BodySchema = MutableUserFields.strict();

export const CreateUserRequestSchema = z.object({
  body: BodySchema,
});

export type CreateUserRequest = z.infer<typeof BodySchema>;

export type CreateUserResponse = UserDto;
