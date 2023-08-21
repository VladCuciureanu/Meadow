import { z } from "zod";
import { FolderSchema } from "../entities";

const HasFolderId = z.object({
  params: z.object({
    folderId: z
      .string({ required_error: "Folder ID is required." })
      .uuid("Invalid folder ID."),
  }),
});

const MutableFields = FolderSchema.omit({
  id: true,
  itemOrder: true,
  documents: true,
  parentFolder: true,
  childrenFolders: true,
  space: true,
  created: true,
  updated: true,
});

export const CreateFolderSchema = z.object({
  body: MutableFields.strict(),
});

export const UpdateFolderSchema = HasFolderId.extend({
  body: MutableFields.strict(),
});

export const PatchFolderSchema = HasFolderId.extend({
  body: MutableFields.deepPartial().strict(),
});

export const DeleteFolderSchema = HasFolderId;
