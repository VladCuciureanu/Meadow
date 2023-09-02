import { z } from "zod";
import { DocumentDto } from "..";
import { HasIdSchema } from "../../common/has-id";

export const GetDocumentRequestSchema = z.object({
  params: HasIdSchema,
});

export type GetDocumentRequest = z.infer<typeof HasIdSchema>;

export type GetDocumentResponse = DocumentDto;
