import { z } from "zod";
import { UserSchema } from "./user";
import { SpaceSchema } from "./space";
import { FolderSchema } from "./folder";
import { BlockSchema } from "./block";
import { Block, Document, Folder, Space, User } from "../..";

export const DocumentSchema: DocumentSchemaType = z.object({
  id: z.string().uuid(),
  title: z.string(),
  previewUrl: z.string().url(),
  isEmpty: z.boolean(),
  authorId: z.string().uuid(),
  author: UserSchema,
  spaceId: z.string().uuid(),
  space: SpaceSchema,
  folderId: z.string().uuid().optional(),
  folder: z.lazy(() => FolderSchema.optional()),
  rootBlockId: z.string().uuid(),
  rootBlock: BlockSchema,
  created: z.date(),
  updated: z.date(),
}) satisfies z.ZodType<Document>;

type DocumentSchemaType = z.ZodObject<
  {
    id: z.ZodString;
    title: z.ZodString;
    previewUrl: z.ZodString;
    isEmpty: z.ZodBoolean;
    authorId: z.ZodString;
    author: z.ZodType<User>;
    spaceId: z.ZodString;
    space: z.ZodType<Space>;
    folderId: z.ZodOptional<z.ZodString>;
    folder: z.ZodLazy<z.ZodOptional<z.ZodType<Folder>>>;
    rootBlockId: z.ZodString;
    rootBlock: z.ZodType<Block>;
    created: z.ZodDate;
    updated: z.ZodDate;
  },
  "strip",
  z.ZodTypeAny,
  Document,
  Document
>;
