import { z } from "zod";
import { HasIdSchema } from "../../common/has-id";

export const DeleteBlockRequestSchema = z.object({
  params: HasIdSchema,
});

export type DeleteBlockRequest = z.infer<typeof HasIdSchema>;
