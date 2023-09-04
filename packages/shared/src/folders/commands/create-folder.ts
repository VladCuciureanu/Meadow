import { z } from "zod";
import { FolderDto, FolderIconType } from "..";
import { MutableFolderFields } from ".";

const BodySchema = MutableFolderFields.strict();

export const CreateFolderRequestSchema = z.object({
  body: BodySchema,
});

export type CreateFolderRequest = z.infer<typeof BodySchema>;

export type CreateFolderResponse = FolderDto;
