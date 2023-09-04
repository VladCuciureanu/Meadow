import { z } from "zod";
import { HasIdSchema } from "../../common/has-id";
import { HasFolderIdSchema } from "..";

export const DeleteFolderRequestSchema = HasFolderIdSchema;

export type DeleteFolderRequest = z.infer<typeof HasIdSchema>;
