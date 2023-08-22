import { z } from "zod";

const HasTeamId = z.object({
  params: z.object({
    teamId: z
      .string({ required_error: "Team ID is required." })
      .uuid("Invalid team ID."),
  }),
});

const MutableFields = z.object({
  name: z.string(),
  imgUrl: z.string().url().optional(),
});

export const CreateTeamSchema = z.object({
  body: MutableFields.strict(),
});

export const UpdateTeamSchema = HasTeamId.extend({
  body: MutableFields.strict(),
});

export const PatchTeamSchema = HasTeamId.extend({
  body: MutableFields.deepPartial().strict(),
});

export const DeleteTeamSchema = HasTeamId;

export type CreateTeamRequest = z.infer<typeof CreateTeamSchema>;
export type UpdateTeamRequest = z.infer<typeof UpdateTeamSchema>;
export type PatchTeamRequest = z.infer<typeof PatchTeamSchema>;
export type DeleteTeamRequest = z.infer<typeof DeleteTeamSchema>;
