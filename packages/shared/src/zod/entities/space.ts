import { z } from "zod";
import { TeamSchema } from "./team";
import { FolderSchema } from "./folder";
import { DocumentSchema } from "./document";
import { BlockSchema } from "./block";
import { Block, Document, Folder, Space, Team } from "../..";

export const SpaceSchema: SpaceSchemaType = z.object({
  id: z.string().uuid(),
  name: z.string(),
  imgUrl: z.string().url().optional(),
  blocks: BlockSchema.array(),
  documents: DocumentSchema.array(),
  folders: FolderSchema.array(),
  rootFolderOrder: z.string().uuid().array(),
  teamId: z.string().uuid(),
  team: TeamSchema,
}) satisfies z.ZodType<Space>;

type SpaceSchemaType = z.ZodObject<
  {
    id: z.ZodString;
    name: z.ZodString;
    imgUrl: z.ZodOptional<z.ZodString>;
    documents: z.ZodArray<z.ZodType<Document, z.ZodTypeDef, Document>, "many">;
    blocks: z.ZodArray<z.ZodType<Block, z.ZodTypeDef, Block>, "many">;
    folders: z.ZodArray<z.ZodType<Folder, z.ZodTypeDef, Folder>, "many">;
    rootFolderOrder: z.ZodArray<z.ZodString, "many">;
    teamId: z.ZodString;
    team: z.ZodType<Team, z.ZodTypeDef, Team>;
  },
  "strip",
  z.ZodTypeAny,
  Space,
  Space
>;
