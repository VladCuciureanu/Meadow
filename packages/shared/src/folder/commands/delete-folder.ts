import { z } from "zod";
import { HasIdSchema } from "../../common/has-id";

export const DeleteFolderRequestSchema = z.object({
  params: HasIdSchema,
});

export type DeleteFolderRequest = z.infer<typeof HasIdSchema>;
