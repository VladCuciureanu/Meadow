import { z } from "zod";

const HasDocumentId = z.object({
  params: z.object({
    documentId: z
      .string({ required_error: "Document ID is required." })
      .uuid("Invalid document ID."),
  }),
});

const MutableFields = z.object({
  title: z.string(),
  spaceId: z.string().uuid(),
  folderId: z.string().uuid().optional(),
  rootBlockId: z.string().uuid(),
});

export const CreateDocumentSchema = z.object({
  body: MutableFields.omit({ rootBlockId: true }).strict(),
});

export const UpdateDocumentSchema = HasDocumentId.extend({
  body: MutableFields.strict(),
});

export const PatchDocumentSchema = HasDocumentId.extend({
  body: MutableFields.deepPartial().strict(),
});

export const DeleteDocumentSchema = HasDocumentId;

export type CreateDocumentRequest = z.infer<typeof CreateDocumentSchema>;
export type UpdateDocumentRequest = z.infer<typeof UpdateDocumentSchema>;
export type PatchDocumentRequest = z.infer<typeof PatchDocumentSchema>;
export type DeleteDocumentRequest = z.infer<typeof DeleteDocumentSchema>;
