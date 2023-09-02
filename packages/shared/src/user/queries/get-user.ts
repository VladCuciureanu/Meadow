import { z } from "zod";
import { PartialUserDto } from "..";
import { HasIdSchema } from "../../common/has-id";

export const GetUserRequestSchema = z.object({
  params: HasIdSchema,
});

export type GetUserRequest = z.infer<typeof HasIdSchema>;

export type GetUserResponse = PartialUserDto;
