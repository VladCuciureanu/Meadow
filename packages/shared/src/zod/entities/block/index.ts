import { z } from "zod";
import { TextBlock, TextBlockSchema } from "./text";
import { DividerBlock, DividerBlockSchema } from "./divider";
import { CodeBlock, CodeBlockSchema } from "./code";
import { ImageBlock, ImageBlockSchema } from "./resource/image";
import { VideoBlock, VideoBlockSchema } from "./resource/video";
import { FileBlock, FileBlockSchema } from "./resource/file";
import { UrlBlock, UrlBlockSchema } from "./url";

export const BlockTypeEnum = z.enum([
  "Text",
  "Divider",
  "Code",
  "Image",
  "Video",
  "File",
  "Url",
]);
export type BlockType = z.infer<typeof BlockTypeEnum>;

export const BlockSchema = z.discriminatedUnion("type", [
  TextBlockSchema,
  DividerBlockSchema,
  CodeBlockSchema,
  ImageBlockSchema,
  VideoBlockSchema,
  FileBlockSchema,
  UrlBlockSchema,
]);
export type Block =
  | TextBlock
  | DividerBlock
  | CodeBlock
  | ImageBlock
  | VideoBlock
  | FileBlock
  | UrlBlock;

export * from "./base";
export * from "./text";
export * from "./divider";
export * from "./code";
export * from "./resource";
export * from "./url";
