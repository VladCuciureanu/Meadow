import { z } from "zod";
import { Team, TeamSchema } from "./team";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  imgUrl?: string;
  teams: Team[];
};

export const UserSchema: z.ZodType<User> = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  passwordHash: z.string(),
  imgUrl: z.string().url().optional(),
  teams: TeamSchema.array(),
});
