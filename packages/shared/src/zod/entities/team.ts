import { z } from "zod";
import { UserSchema } from "./user";
import { SpaceSchema } from "./space";
import { Team } from "../..";

export const TeamSchema: z.ZodType<Team> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  imgUrl: z.string().url().optional(),
  members: UserSchema.array(),
  spaces: SpaceSchema.array(),
});
