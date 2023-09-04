import { z } from "zod";
import { PaginationSchema } from "../../common/pagination";
import { DocumentDto } from "..";

export const GetDocumentsRequestSchema = z.object({
  body: PaginationSchema,
});

export type GetDocumentsRequest = z.infer<typeof PaginationSchema>;

export type GetDocumentsResponse = DocumentDto[];
