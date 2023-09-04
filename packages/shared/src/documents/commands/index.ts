import { z } from "zod";

export const MutableDocumentFields = z.object({
  title: z.string(),
  isEmpty: z.boolean(),
  authorId: z.string().uuid(),
  folderId: z.string().uuid(),
  rootBlockId: z.string().uuid(),
});
