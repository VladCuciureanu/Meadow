import { z } from "zod";
import { PaginationSchema } from "../../common/pagination";
import { PartialUserDto } from "..";

export const GetUsersRequestSchema = z.object({
  body: PaginationSchema,
});

export type GetUsersRequest = z.infer<typeof PaginationSchema>;

export type GetUsersResponse = PartialUserDto[];
