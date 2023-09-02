import { z } from "zod";

export const MutableUserFields = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  imgUrl: z.string().url().optional(),
});
