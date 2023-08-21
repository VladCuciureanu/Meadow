import { z } from "zod";
import {
  CodeBlockSchema,
  DividerBlockSchema,
  FileBlockSchema,
  ImageBlockSchema,
  TextBlockSchema,
  UrlBlockSchema,
  VideoBlockSchema,
} from "../entities";

const HasBlockId = z.object({
  params: z.object({
    blockId: z
      .string({ required_error: "Block ID is required." })
      .uuid("Invalid block ID."),
  }),
});

// const BaseBlockOmittedFields: Record<string, true | undefined> = {
//   id: true,
//   space: true,
//   document: true,
// };

// const TextBlockOmittedFields: Record<string, true | undefined> = {
//   ...BaseBlockOmittedFields,
//   parentBlock: true,
//   subblocks: true,
// };

// export const MutableFields = z.discriminatedUnion("type", [
//   TextBlockSchema.omit(TextBlockOmittedFields).strict(),
//   DividerBlockSchema.strict(),
//   CodeBlockSchema.strict(),
//   ImageBlockSchema.strict(),
//   VideoBlockSchema.strict(),
//   FileBlockSchema.strict(),
//   UrlBlockSchema.strict(),
// ]);

// export const PartialMutableFields = z.discriminatedUnion("type", [
//   TextBlockSchema.partial().strict(),
//   DividerBlockSchema.partial().strict(),
//   CodeBlockSchema.partial().strict(),
//   ImageBlockSchema.partial().strict(),
//   VideoBlockSchema.partial().strict(),
//   FileBlockSchema.partial().strict(),
//   UrlBlockSchema.partial().strict(),
// ]);

// TODO
export const CreateBlockSchema = z.object({
  body: z.any(),
});

export const UpdateBlockSchema = HasBlockId.extend({
  body: z.any(),
});

export const PatchBlockSchema = HasBlockId.extend({
  body: z.any(),
});

export const DeleteBlockSchema = HasBlockId;
