import { z } from "zod";
import { SpaceDto } from "..";
import { HasIdSchema } from "../../common/has-id";
import { MutableSpaceFields } from ".";

const BodySchema = MutableSpaceFields.partial().strict();

export const UpdateSpaceRequestSchema = z.object({
  params: HasIdSchema,
  body: BodySchema,
});

export type UpdateSpaceRequest = z.infer<
  typeof BodySchema & typeof HasIdSchema
>;

export type UpdateSpaceResponse = SpaceDto;
