import { z } from "zod";
import { FolderDto, HasFolderIdSchema } from "..";
import { HasIdSchema } from "../../common/has-id";

export const GetFolderRequestSchema = HasFolderIdSchema;

export type GetFolderRequest = z.infer<typeof HasIdSchema>;

export type GetFolderResponse = FolderDto;
