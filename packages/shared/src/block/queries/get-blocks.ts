import { z } from "zod";
import { PaginationSchema } from "../../common/pagination";
import { BlockDto } from "..";

export const GetBlocksRequestSchema = z.object({
  body: PaginationSchema,
});

export type GetBlocksRequest = z.infer<typeof PaginationSchema>;

export type GetBlocksResponse = BlockDto[];
