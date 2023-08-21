import { z } from "zod";
import { DocumentSchema } from "../entities";

const HasDocumentId = z.object({
  params: z.object({
    documentId: z
      .string({ required_error: "Document ID is required." })
      .uuid("Invalid document ID."),
  }),
});

const MutableFields = DocumentSchema.omit({
  id: true,
  previewUrl: true,
  isEmpty: true,
  author: true,
  space: true,
  folder: true,
  rootBlock: true,
  created: true,
  updated: true,
});

export const CreateDocumentSchema = z.object({
  body: MutableFields.strict(),
});

export const UpdateDocumentSchema = HasDocumentId.extend({
  body: MutableFields.strict(),
});

export const PatchDocumentSchema = HasDocumentId.extend({
  body: MutableFields.deepPartial().strict(),
});

export const DeleteDocumentSchema = HasDocumentId;
