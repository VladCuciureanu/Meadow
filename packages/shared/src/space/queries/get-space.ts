import { z } from "zod";
import { SpaceDto } from "..";
import { HasIdSchema } from "../../common/has-id";

export const GetSpaceRequestSchema = z.object({
  params: HasIdSchema,
});

export type GetSpaceRequest = z.infer<typeof HasIdSchema>;

export type GetSpaceResponse = SpaceDto;
