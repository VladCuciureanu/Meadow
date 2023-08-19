import { z } from "zod";
import { User } from "../..";
import { TeamSchema } from "./team";

export const UserSchema: z.ZodType<User> = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  passwordHash: z.string(),
  imgUrl: z.string().url().optional(),
  teams: TeamSchema.array(),
});
