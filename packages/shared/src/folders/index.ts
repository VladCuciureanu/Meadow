import { z } from "zod";
import { PartialDocumentDto } from "../documents";
import { PartialSpaceDto } from "../spaces";
import { PartialUserDto } from "../users";
import { FolderIconConfig } from "./interfaces/folder-icon-config";

export type FolderDto = {
  id: string;
  name: string;
  description?: string;
  icon: FolderIconConfig;
  itemOrder: string[];
  documents: PartialDocumentDto[];
  parentFolder?: PartialFolderDto;
  childrenFolders: PartialFolderDto[];
  space: PartialSpaceDto;
  createdAt: Date;
  createdBy: PartialUserDto;
  modifiedAt: Date;
  modifiedBy: PartialUserDto;
};

export type PartialFolderDto = Pick<
  FolderDto,
  "id" | "name" | "description" | "icon" | "space" | "createdAt" | "modifiedAt"
>;

export const HasFolderIdSchema = z.object({
  params: z.object({
    folderId: z.string().uuid(),
  }),
});

export * from "./commands";
export * from "./commands/create-folder";
export * from "./commands/update-folder";
export * from "./commands/delete-folder";
export * from "./enums/folder-icon-type";
export * from "./interfaces/folder-icon-config";
export * from "./queries/get-folder";
export * from "./queries/get-folders";
