import { z } from "zod";

export const HasIdSchema = z.object({
  id: z.string().uuid(),
});
