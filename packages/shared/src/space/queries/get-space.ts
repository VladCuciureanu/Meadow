import { z } from "zod";
import { HasSpaceIdSchema, SpaceDto } from "..";
import { HasIdSchema } from "../../common/has-id";

export const GetSpaceRequestSchema = HasSpaceIdSchema;

export type GetSpaceRequest = z.infer<typeof HasIdSchema>;

export type GetSpaceResponse = SpaceDto;
