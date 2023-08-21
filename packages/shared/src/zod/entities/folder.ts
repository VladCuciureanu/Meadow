import { z } from "zod";
import { SpaceSchema } from "./space";
import { DocumentSchema } from "./document";
import { Document, Folder, FolderIconType, Space } from "../..";

const FolderIconConfigSchema = z.object({
  tintColor: z.string().optional(),
  type: z.nativeEnum(FolderIconType),
  value: z.string(),
});

export const FolderSchema: FolderSchemaType = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  icon: FolderIconConfigSchema,
  itemOrder: z.string().uuid().array(),
  documents: DocumentSchema.array(),
  parentFolderId: z.string().uuid().optional(),
  parentFolder: z.lazy(() => FolderSchema.optional()),
  childrenFolders: z.lazy(() => FolderSchema.array()),
  spaceId: z.string().uuid(),
  space: SpaceSchema,
  created: z.date(),
  updated: z.date(),
}) satisfies z.ZodType<Folder>;

type FolderSchemaType = z.ZodObject<
  {
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    icon: z.ZodObject<
      {
        tintColor: z.ZodOptional<z.ZodString>;
        type: z.ZodNativeEnum<typeof FolderIconType>;
        value: z.ZodString;
      },
      "strip",
      z.ZodTypeAny,
      {
        type: FolderIconType;
        value: string;
        tintColor?: string | undefined;
      },
      {
        type: FolderIconType;
        value: string;
        tintColor?: string | undefined;
      }
    >;
    itemOrder: z.ZodArray<z.ZodString, "many">;
    documents: z.ZodArray<z.ZodType<Document, z.ZodTypeDef, Document>, "many">;
    parentFolderId: z.ZodOptional<z.ZodString>;
    parentFolder: z.ZodLazy<z.ZodOptional<z.ZodType<Folder>>>;
    childrenFolders: z.ZodLazy<z.ZodArray<z.ZodType<Folder>>>;
    spaceId: z.ZodString;
    space: z.ZodType<Space>;
    created: z.ZodDate;
    updated: z.ZodDate;
  },
  "strip",
  z.ZodTypeAny,
  Folder,
  Folder
>;
