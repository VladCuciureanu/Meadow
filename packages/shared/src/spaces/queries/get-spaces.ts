import { z } from "zod";
import { PaginationSchema } from "../../common/pagination";
import { SpaceDto } from "..";

export const GetSpacesRequestSchema = z.object({
  body: PaginationSchema,
});

export type GetSpacesRequest = z.infer<typeof PaginationSchema>;

export type GetSpacesResponse = SpaceDto[];
