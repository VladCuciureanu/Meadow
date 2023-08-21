import { z } from "zod";
import { FolderSchema } from "../entities";

const HasFolderId = z.object({
  params: z.object({
    folderId: z
      .string({ required_error: "Folder ID is required." })
      .uuid("Invalid folder ID."),
  }),
});

export const CreateFolderSchema = z.object({
  body: FolderSchema.omit({
    id: true,
    itemOrder: true,
    documents: true,
    parentFolder: true,
    childrenFolders: true,
    space: true,
    created: true,
    updated: true,
  }).strict(),
});

export const UpdateFolderSchema = HasFolderId.extend({
  body: FolderSchema.omit({
    id: true,
    itemOrder: true,
    documents: true,
    parentFolder: true,
    childrenFolders: true,
    space: true,
    created: true,
    updated: true,
  }).strict(),
});

export const PatchFolderSchema = HasFolderId.extend({
  body: FolderSchema.omit({
    id: true,
    itemOrder: true,
    documents: true,
    parentFolder: true,
    childrenFolders: true,
    space: true,
    created: true,
    updated: true,
  })
    .partial()
    .strict(),
});
