import { z } from "zod";
import { TeamSchema } from "../entities";

const HasTeamId = z.object({
  params: z.object({
    teamId: z
      .string({ required_error: "Team ID is required." })
      .uuid("Invalid team ID."),
  }),
});

const MutableFields = TeamSchema.omit({
  id: true,
  members: true,
  spaces: true,
});

export const CreateTeamSchema = z.object({
  body: MutableFields.strict(),
});

export const UpdateTeamSchema = HasTeamId.extend({
  body: MutableFields.strict(),
});

export const PatchTeamSchema = HasTeamId.extend({
  body: MutableFields.partial().strict(),
});

export const DeleteTeamSchema = HasTeamId;
