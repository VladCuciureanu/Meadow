import { z } from "zod";
import { HasUserIdSchema, PartialUserDto } from "..";
import { HasIdSchema } from "../../common/has-id";

export const GetUserRequestSchema = HasUserIdSchema;

export type GetUserRequest = z.infer<typeof HasIdSchema>;

export type GetUserResponse = PartialUserDto;
