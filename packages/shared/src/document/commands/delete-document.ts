import { z } from "zod";
import { HasIdSchema } from "../../common/has-id";

export const DeleteDocumentRequestSchema = z.object({
  params: HasIdSchema,
});

export type DeleteDocumentRequest = z.infer<typeof HasIdSchema>;
