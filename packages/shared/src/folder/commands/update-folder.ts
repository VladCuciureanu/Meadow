import { z } from "zod";
import { FolderDto, FolderIconType, HasFolderIdSchema } from "..";
import { HasIdSchema } from "../../common/has-id";
import { MutableFolderFields } from ".";

const BodySchema = MutableFolderFields.deepPartial().strict();

export const UpdateFolderRequestSchema = z
  .object({
    body: BodySchema,
  })
  .merge(HasFolderIdSchema);

export type UpdateFolderRequest = z.infer<
  typeof BodySchema & typeof HasIdSchema
>;

export type UpdateFolderResponse = FolderDto;
