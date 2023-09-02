import { z } from "zod";
import { MutableBlockFields } from ".";
import { BlockDto } from "..";

const BodySchema = MutableBlockFields.strict();

export const CreateBlockRequestSchema = z.object({
  body: BodySchema,
});

export type CreateBlockRequest = z.infer<typeof BodySchema>;

export type CreateBlockResponse = BlockDto;
