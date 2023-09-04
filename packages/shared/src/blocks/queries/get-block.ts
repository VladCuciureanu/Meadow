import { z } from "zod";
import { BlockDto, HasBlockIdSchema } from "..";
import { HasIdSchema } from "../../common/has-id";

export const GetBlockRequestSchema = HasBlockIdSchema;

export type GetBlockRequest = z.infer<typeof HasIdSchema>;

export type GetBlockResponse = BlockDto;
