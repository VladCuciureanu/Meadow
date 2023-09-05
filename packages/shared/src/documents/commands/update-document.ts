import { z } from "zod";
import { DocumentDto, HasDocumentIdSchema } from "..";
import { HasIdSchema } from "../../common/has-id";
import { MutableDocumentFields } from ".";

const BodySchema = MutableDocumentFields.omit({
  authorId: true,
  rootBlockId: true,
})
  .deepPartial()
  .strict();

export const UpdateDocumentRequestSchema = z
  .object({
    body: BodySchema,
  })
  .merge(HasDocumentIdSchema);

export type UpdateDocumentRequest = z.infer<
  typeof BodySchema & typeof HasIdSchema
>;

export type UpdateDocumentResponse = DocumentDto;
