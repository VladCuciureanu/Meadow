import { z } from "zod";

export const MutableTeamFields = z.object({
  name: z.string(),
  imgUrl: z.string().url().optional(),
});
