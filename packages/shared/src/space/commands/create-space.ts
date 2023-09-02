import { z } from "zod";
import { SpaceDto } from "..";
import { MutableSpaceFields } from ".";

const BodySchema = MutableSpaceFields.strict();

export const CreateSpaceRequestSchema = z.object({
  body: BodySchema,
});

export type CreateSpaceRequest = z.infer<typeof BodySchema>;

export type CreateSpaceResponse = SpaceDto;
