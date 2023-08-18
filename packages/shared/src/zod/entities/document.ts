import { z } from "zod";
import { User, UserSchema } from "./user";
import { Space, SpaceSchema } from "./space";
import { Folder, FolderSchema } from "./folder";
import { Block, BlockSchema } from "./block";

export type Document = {
  id: string;
  title: string;
  previewUrl: string;
  isEmpty: boolean;
  authorId: string;
  author: User;
  spaceId: string;
  space: Space;
  folderId?: string;
  folder?: Folder;
  rootBlockId: string;
  rootBlock: Block;
  created: Date;
  updated: Date;
};

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
  folder: FolderSchema.optional(),
  rootBlockId: z.string().uuid(),
  rootBlock: BlockSchema,
  created: z.date(),
  updated: z.date(),
});
