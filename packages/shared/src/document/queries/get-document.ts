import { z } from "zod";
import { DocumentDto, HasDocumentIdSchema } from "..";
import { HasIdSchema } from "../../common/has-id";

export const GetDocumentRequestSchema = HasDocumentIdSchema;

export type GetDocumentRequest = z.infer<typeof HasIdSchema>;

export type GetDocumentResponse = DocumentDto;
