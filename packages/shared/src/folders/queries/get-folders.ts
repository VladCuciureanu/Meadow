import { z } from "zod";
import { PaginationSchema } from "../../common/pagination";
import { FolderDto } from "..";

export const GetFoldersRequestSchema = z.object({
  body: PaginationSchema,
});

export type GetFoldersRequest = z.infer<typeof PaginationSchema>;

export type GetFoldersResponse = FolderDto[];
