import { z } from "zod";
import { FolderIconType } from "..";

const HasFolderId = z.object({
  params: z.object({
    folderId: z
      .string({ required_error: "Folder ID is required." })
      .uuid("Invalid folder ID."),
  }),
});

const MutableFields = z.object({
  name: z.string(),
  description: z.string().optional(),
  icon: z.object({
    tintColor: z.string().optional(),
    type: z.nativeEnum(FolderIconType),
    value: z.string(),
  }),
  itemOrder: z.string().uuid().array(),
  parentFolderId: z.string().uuid().optional(),
  spaceId: z.string().uuid(),
});

export const CreateFolderSchema = z.object({
  body: MutableFields.omit({ itemOrder: true }).strict(),
});

export const UpdateFolderSchema = HasFolderId.extend({
  body: MutableFields.strict(),
});

export const PatchFolderSchema = HasFolderId.extend({
  body: MutableFields.deepPartial().strict(),
});

export const DeleteFolderSchema = HasFolderId;

export type CreateFolderRequest = z.infer<typeof CreateFolderSchema>;
export type UpdateFolderRequest = z.infer<typeof UpdateFolderSchema>;
export type PatchFolderRequest = z.infer<typeof PatchFolderSchema>;
export type DeleteFolderRequest = z.infer<typeof DeleteFolderSchema>;
