import { z } from "zod";

const HasSpaceId = z.object({
  params: z.object({
    spaceId: z
      .string({ required_error: "Space ID is required." })
      .uuid("Invalid space ID."),
  }),
});

const MutableFields = z.object({
  name: z.string(),
  imgUrl: z.string().url().optional(),
  rootFolderOrder: z.string().uuid().array(),
  teamId: z.string().uuid(),
});

export const CreateSpaceSchema = z.object({
  body: MutableFields.omit({ rootFolderOrder: true }).strict(),
});

export const UpdateSpaceSchema = HasSpaceId.extend({
  body: MutableFields.strict(),
});

export const PatchSpaceSchema = HasSpaceId.extend({
  body: MutableFields.deepPartial().strict(),
});

export const DeleteSpaceSchema = HasSpaceId;

export type CreateSpaceRequest = z.infer<typeof CreateSpaceSchema>;
export type UpdateSpaceRequest = z.infer<typeof UpdateSpaceSchema>;
export type PatchSpaceRequest = z.infer<typeof PatchSpaceSchema>;
export type DeleteSpaceRequest = z.infer<typeof DeleteSpaceSchema>;
