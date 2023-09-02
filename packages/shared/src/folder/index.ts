import { PartialDocumentDto } from "../document";
import { PartialSpaceDto } from "../space";
import { PartialUserDto } from "../user";

export enum FolderIconType {
  Emoji,
  LocalImage,
}

export type FolderDto = {
  id: string;
  name: string;
  description?: string;
  icon: {
    tintColor?: string;
    type: FolderIconType;
    value: string;
  };
  itemOrder: string[];
  documents: PartialDocumentDto[];
  parentFolder: PartialFolderDto;
  childrenFolders: PartialFolderDto[];
  space: PartialSpaceDto;
  createdAt: Date;
  createdBy: PartialUserDto;
  modifiedAt: Date;
  modifiedBy: PartialUserDto;
};

export type PartialFolderDto = Pick<
  FolderDto,
  "id" | "name" | "description" | "icon" | "createdAt" | "modifiedAt"
>;
