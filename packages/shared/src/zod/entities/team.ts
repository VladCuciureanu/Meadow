import { z } from "zod";
import { UserSchema } from "./user";
import { SpaceSchema } from "./space";
import { Space, Team, User } from "../..";

export const TeamSchema: TeamSchemaType = z.object({
  id: z.string().uuid(),
  name: z.string(),
  imgUrl: z.string().url().optional(),
  members: z.lazy(() => UserSchema.array()),
  spaces: SpaceSchema.array(),
}) satisfies z.ZodType<Team>;

type TeamSchemaType = z.ZodObject<
  {
    id: z.ZodString;
    name: z.ZodString;
    imgUrl: z.ZodOptional<z.ZodString>;
    members: z.ZodLazy<z.ZodArray<z.ZodType<User, z.ZodTypeDef, User>, "many">>;
    spaces: z.ZodArray<z.ZodType<Space, z.ZodTypeDef, Space>, "many">;
  },
  "strip",
  z.ZodTypeAny,
  Team,
  Team
>;
