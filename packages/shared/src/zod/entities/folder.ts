import { z } from "zod";
import { Space, SpaceSchema } from "./space";
import { Document, DocumentSchema } from "./document";

const FolderIconTypeEnum = z.enum(["Emoji", "LocalImage"]);
export type FolderIconType = z.infer<typeof FolderIconTypeEnum>;

const FolderIconConfigSchema = z.object({
  tintColor: z.string().optional(),
  type: FolderIconTypeEnum,
  value: z.string(),
});
export type FolderIconConfig = z.infer<typeof FolderIconConfigSchema>;

export type Folder = {
  id: string;
  name: string;
  description?: string;
  icon: FolderIconConfig;
  itemOrder: string[];
  documents: Document[];
  parentFolderId?: string;
  parentFolder?: Folder;
  childrenFolders: Folder[];
  spaceId?: string;
  space: Space;
  created: Date;
  updated: Date;
};

export const FolderSchema: z.ZodType<Folder> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  icon: FolderIconConfigSchema,
  itemOrder: z.string().uuid().array(),
  documents: DocumentSchema.array(),
  parentFolderId: z.string().uuid().optional(),
  parentFolder: z.lazy(() => FolderSchema).optional(),
  childrenFolders: z.lazy(() => FolderSchema.array()),
  spaceId: z.string().uuid().optional(),
  space: SpaceSchema,
  created: z.date(),
  updated: z.date(),
});
