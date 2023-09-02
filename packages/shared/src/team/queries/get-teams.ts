import { z } from "zod";
import { PaginationSchema } from "../../common/pagination";
import { TeamDto } from "..";

export const GetTeamsRequestSchema = z.object({
  body: PaginationSchema,
});

export type GetTeamsRequest = z.infer<typeof PaginationSchema>;

export type GetTeamsResponse = TeamDto[];
