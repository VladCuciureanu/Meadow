import { z } from "zod";
import { HasIdSchema } from "../../common/has-id";
import { HasDocumentIdSchema } from "..";

export const DeleteDocumentRequestSchema = HasDocumentIdSchema;

export type DeleteDocumentRequest = z.infer<typeof HasIdSchema>;
