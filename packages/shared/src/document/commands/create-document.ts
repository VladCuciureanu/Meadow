import { z } from "zod";
import { DocumentDto } from "..";
import { MutableDocumentFields } from ".";

const BodySchema = MutableDocumentFields.omit({
  isEmpty: true,
  rootBlockId: true,
}).strict();

export const CreateDocumentRequestSchema = z.object({
  body: BodySchema,
});

export type CreateDocumentRequest = z.infer<typeof BodySchema>;

export type CreateDocumentResponse = DocumentDto;
