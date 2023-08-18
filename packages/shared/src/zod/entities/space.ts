import { z } from "zod";
import { Team, TeamSchema } from "./team";
import { Folder, FolderSchema } from "./folder";
import { Document, DocumentSchema } from "./document";
import { Block, BlockSchema } from "./block";

export type Space = {
  id: string;
  name: string;
  imgUrl?: string;
  blocks: Block[];
  documents: Document[];
  folders: Folder[];
  rootFolderOrder: string[];
  teamId: string;
  team: Team;
};

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
