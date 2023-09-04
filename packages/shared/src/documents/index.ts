import { z } from "zod";
import { PartialBlockDto } from "../blocks";
import { PartialFolderDto } from "../folders";
import { PartialUserDto } from "../users";

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

export const HasDocumentIdSchema = z.object({
  params: z.object({
    documentId: z.string().uuid(),
  }),
});

export * from "./commands";
export * from "./commands/create-document";
export * from "./commands/update-document";
export * from "./commands/delete-document";
export * from "./queries/get-document";
export * from "./queries/get-documents";
