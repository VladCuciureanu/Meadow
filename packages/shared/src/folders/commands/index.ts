import { z } from "zod";
import { FolderIconType } from "..";

export const MutableFolderFields = z.object({
  name: z.string(),
  description: z.string().optional(),
  icon: z.object({
    tintColor: z.string().optional(),
    type: z.nativeEnum(FolderIconType),
    value: z.string(),
  }),
  parentFolderId: z.string().uuid().optional(),
  spaceId: z.string().uuid(),
});
