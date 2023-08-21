import { z } from "zod";
import { SpaceSchema } from "../entities";

const HasSpaceId = z.object({
  params: z.object({
    spaceId: z
      .string({ required_error: "Space ID is required." })
      .uuid("Invalid space ID."),
  }),
});

const MutableFields = SpaceSchema.omit({
  id: true,
  blocks: true,
  documents: true,
  folders: true,
  rootFolderOrder: true,
  team: true,
});

export const CreateSpaceSchema = z.object({
  body: MutableFields.strict(),
});

export const UpdateSpaceSchema = HasSpaceId.extend({
  body: MutableFields.strict(),
});

export const PatchSpaceSchema = HasSpaceId.extend({
  body: MutableFields.deepPartial().strict(),
});

export const DeleteSpaceSchema = HasSpaceId;
