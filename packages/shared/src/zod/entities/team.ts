import { z } from "zod";
import { User, UserSchema } from "./user";
import { Space, SpaceSchema } from "./space";

export type Team = {
  id: string;
  name: string;
  imgUrl?: string;
  members: User[];
  spaces: Space[];
};

export const TeamSchema: z.ZodType<Team> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  imgUrl: z.string().url().optional(),
  members: UserSchema.array(),
  spaces: SpaceSchema.array(),
});
