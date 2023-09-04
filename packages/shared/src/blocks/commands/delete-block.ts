import { z } from "zod";
import { HasIdSchema } from "../../common/has-id";
import { HasBlockIdSchema } from "..";

export const DeleteBlockRequestSchema = HasBlockIdSchema;

export type DeleteBlockRequest = z.infer<typeof HasIdSchema>;
