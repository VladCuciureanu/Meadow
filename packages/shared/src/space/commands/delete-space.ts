import { z } from "zod";
import { HasIdSchema } from "../../common/has-id";
import { HasSpaceIdSchema } from "..";

export const DeleteSpaceRequestSchema = HasSpaceIdSchema;

export type DeleteSpaceRequest = z.infer<typeof HasIdSchema>;
