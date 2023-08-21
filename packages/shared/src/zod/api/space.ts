import { z } from "zod";
import { SpaceSchema } from "../entities";

const HasSpaceId = z.object({
  params: z.object({
    spaceId: z
      .string({ required_error: "Space ID is required." })
      .uuid("Invalid space ID."),
  }),
});

export const CreateSpaceSchema = z.object({
  body: SpaceSchema.omit({
    id: true,
    blocks: true,
    documents: true,
    folders: true,
    rootFolderOrder: true,
    team: true,
  }).strict(),
});

export const UpdateSpaceSchema = HasSpaceId.extend({
  body: SpaceSchema.omit({
    id: true,
    blocks: true,
    documents: true,
    folders: true,
    rootFolderOrder: true,
    team: true,
  }).strict(),
});

export const PatchSpaceSchema = HasSpaceId.extend({
  body: SpaceSchema.omit({
    id: true,
    blocks: true,
    documents: true,
    folders: true,
    rootFolderOrder: true,
    team: true,
  })
    .partial()
    .strict(),
});
