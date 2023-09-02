import { z } from "zod";
import { FolderDto } from "..";
import { HasIdSchema } from "../../common/has-id";

export const GetFolderRequestSchema = z.object({
  params: HasIdSchema,
});

export type GetFolderRequest = z.infer<typeof HasIdSchema>;

export type GetFolderResponse = FolderDto;
