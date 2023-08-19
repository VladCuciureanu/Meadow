import { z } from "zod";
import { TeamSchema } from "./team";
import { FolderSchema } from "./folder";
import { DocumentSchema } from "./document";
import { BlockSchema } from "./block";
import { Space } from "../..";

export const SpaceSchema: z.ZodType<Space> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  imgUrl: z.string().url().optional(),
  blocks: BlockSchema.array(),
  documents: DocumentSchema.array(),
  folders: FolderSchema.array(),
  rootFolderOrder: z.string().uuid().array(),
  teamId: z.string().uuid(),
  team: TeamSchema,
});
