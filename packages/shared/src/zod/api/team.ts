import { z } from "zod";
import { TeamSchema } from "../entities";

const HasTeamId = z.object({
  params: z.object({
    teamId: z
      .string({ required_error: "Team ID is required." })
      .uuid("Invalid team ID."),
  }),
});

export const CreateTeamSchema = z.object({
  body: TeamSchema.omit({
    id: true,
    members: true,
    spaces: true,
  }).strict(),
});

export const UpdateTeamSchema = HasTeamId.extend({
  body: TeamSchema.omit({
    id: true,
    members: true,
    spaces: true,
  }).strict(),
});

export const PatchTeamSchema = HasTeamId.extend({
  body: TeamSchema.omit({
    id: true,
    members: true,
    spaces: true,
  })
    .partial()
    .strict(),
});
