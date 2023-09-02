import { z } from "zod";
import { DocumentDto } from "..";
import { HasIdSchema } from "../../common/has-id";
import { MutableDocumentFields } from ".";

const BodySchema = MutableDocumentFields.deepPartial().strict();

export const UpdateDocumentRequestSchema = z.object({
  params: HasIdSchema,
  body: BodySchema,
});

export type UpdateDocumentRequest = z.infer<
  typeof BodySchema & typeof HasIdSchema
>;

export type UpdateDocumentResponse = DocumentDto;
