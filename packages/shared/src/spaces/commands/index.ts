import { z } from "zod";

export const MutableSpaceFields = z.object({
  name: z.string(),
  imgUrl: z.string().url().optional(),
  teamId: z.string().uuid(),
});
