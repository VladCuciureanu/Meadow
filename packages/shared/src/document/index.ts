import { PartialBlockDto } from "../block";
import { PartialFolderDto } from "../folder";
import { PartialUserDto } from "../user";

export type DocumentDto = {
  id: string;
  title: string;
  previewUrl: string;
  isEmpty: boolean;
  author: PartialUserDto;
  folder: PartialFolderDto;
  rootBlock: PartialBlockDto;
  createdAt: Date;
  createdBy: PartialUserDto;
  modifiedAt: Date;
  modifiedBy: PartialUserDto;
};

export type PartialDocumentDto = Pick<
  DocumentDto,
  "id" | "title" | "previewUrl" | "isEmpty" | "createdAt" | "modifiedAt"
>;
