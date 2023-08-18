import { z } from "zod";
import { LayoutStyle, LayoutStyleEnum } from "./resource";
import { BlockType, BlockTypeEnum } from ".";
import { BaseBlockSchema } from "./base";

export type UrlBlock = z.infer<typeof BaseBlockSchema> & {
  type: BlockType;
  layoutStyle: LayoutStyle;
  url?: string;
  originalUrl?: string;
  imageUrl?: string;
  title?: string;
  pageDescription?: string;
};

export const UrlBlockSchema = BaseBlockSchema.extend({
  type: z.literal(BlockTypeEnum.enum.Url),
  layoutStyle: LayoutStyleEnum,
  url: z.string().url().optional(),
  originalUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  title: z.string().optional(),
  pageDescription: z.string().optional(),
});
