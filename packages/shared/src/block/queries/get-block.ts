import { z } from "zod";
import { BlockDto } from "..";
import { HasIdSchema } from "../../common/has-id";

export const GetBlockRequestSchema = z.object({
  params: HasIdSchema,
});

export type GetBlockRequest = z.infer<typeof HasIdSchema>;

export type GetBlockResponse = BlockDto;
