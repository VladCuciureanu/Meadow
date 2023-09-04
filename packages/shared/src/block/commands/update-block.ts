import { z } from "zod";
import { MutableBlockFields } from ".";
import { BlockDto, HasBlockIdSchema } from "..";
import { HasIdSchema } from "../../common/has-id";

const BodySchema = MutableBlockFields.deepPartial().strict();

export const UpdateBlockRequestSchema = z
  .object({
    body: BodySchema,
  })
  .merge(HasBlockIdSchema);

export type UpdateBlockRequest = z.infer<
  typeof BodySchema & typeof HasIdSchema
>;

export type UpdateBlockResponse = BlockDto;
