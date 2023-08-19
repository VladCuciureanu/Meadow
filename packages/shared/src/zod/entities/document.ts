import { z } from "zod";
import { UserSchema } from "./user";
import { SpaceSchema } from "./space";
import { FolderSchema } from "./folder";
import { BlockSchema } from "./block";
import { Document } from "../..";

export const DocumentSchema: z.ZodType<Document> = z.object({
  id: z.string().uuid(),
  title: z.string(),
  previewUrl: z.string().url(),
  isEmpty: z.boolean(),
  authorId: z.string().uuid(),
  author: UserSchema,
  spaceId: z.string().uuid(),
  space: SpaceSchema,
  folderId: z.string().uuid().optional(),
  folder: z.lazy(() => FolderSchema.optional()),
  rootBlockId: z.string().uuid(),
  rootBlock: BlockSchema,
  created: z.date(),
  updated: z.date(),
});
