import { z } from "zod";
import { SpaceSchema } from "./space";
import { DocumentSchema } from "./document";
import { Folder, FolderIconType } from "../..";

const FolderIconConfigSchema = z.object({
  tintColor: z.string().optional(),
  type: z.nativeEnum(FolderIconType),
  value: z.string(),
});

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
