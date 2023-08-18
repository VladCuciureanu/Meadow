import { z } from "zod";
import { BaseBlock, BaseBlockSchema } from "./base";
import { Block, BlockSchema, BlockType, BlockTypeEnum } from ".";

export const TextRunLinkTypeEnum = z.enum(["Block", "Url", "Formula", "Date"]);
export type TextRunLinkType = z.infer<typeof TextRunLinkTypeEnum>;

export const BlockLinkSchema = z.object({
  type: z.literal(TextRunLinkTypeEnum.enum.Block),
  spaceId: z.string().uuid(),
  blockId: z.string().uuid(),
});
export type BlockLink = z.infer<typeof BlockLinkSchema>;

export const UrlLinkSchema = z.object({
  type: z.literal(TextRunLinkTypeEnum.enum.Url),
  url: z.string().url(),
});
export type UrlLink = z.infer<typeof UrlLinkSchema>;

export const FormulaLinkSchema = z.object({
  type: z.literal(TextRunLinkTypeEnum.enum.Formula),
  formula: z.string(),
});
export type FormulaLink = z.infer<typeof FormulaLinkSchema>;

export const DateLinkSchema = z.object({
  type: z.literal(TextRunLinkTypeEnum.enum.Date),
  date: z.date(),
});
export type DateLink = z.infer<typeof DateLinkSchema>;

export const TextRunLinkSchema = z.discriminatedUnion("type", [
  BlockLinkSchema,
  UrlLinkSchema,
  FormulaLinkSchema,
  DateLinkSchema,
]);
export type TextRunLink = z.infer<typeof TextRunLinkSchema>;

export const TextHighlightColorEnum = z.enum([
  "Yellow",
  "Lime",
  "Green",
  "Cyan",
  "Blue",
  "Purple",
  "Pink",
  "Red",
  "Grey",
  "BeachGradient",
  "NightSkyGradient",
  "SunsetGradient",
  "OrangeGradient",
  "GoldGradient",
]);
export type TextHighlightColor = z.infer<typeof TextHighlightColorEnum>;

export const TextRunSchema = z.object({
  text: z.string(),
  isBold: z.boolean().optional(),
  isItalic: z.boolean().optional(),
  isStrikethrough: z.boolean().optional(),
  isCode: z.boolean().optional(),
  highlightColor: TextHighlightColorEnum.optional(),
  link: TextRunLinkSchema.optional(),
});
export type TextRun = z.infer<typeof TextRunSchema>;

export const TextStyleEnum = z.enum([
  "Title",
  "Subtitle",
  "Heading",
  "Strong",
  "Body",
  "Caption",
  "Card",
  "Page",
]);
export type TextStyle = z.infer<typeof TextStyleEnum>;

export const FontStyleEnum = z.enum([
  "SystemRounded",
  "SystemSerif",
  "System",
  "SystemMono",
]);
export type FontStyle = z.infer<typeof FontStyleEnum>;

export const AlignmentStyleEnum = z.enum(["Left", "Right", "Center"]);
export type AlignmentStyle = z.infer<typeof AlignmentStyleEnum>;

export const CardTypeEnum = z.enum([
  "Subtle",
  "Small",
  "Square",
  "Wide",
  "Large",
]);
export type CardType = z.infer<typeof CardTypeEnum>;

export const CardFontStyleEnum = z.enum(["Regular", "Serif", "Rounded"]);
export type CardFontStyle = z.infer<typeof CardFontStyleEnum>;

export const CardBackgroundColorKeyEnum = z.enum([
  "White",
  "DarkGray",
  "Blue",
  "Ocean",
  "Cyan",
  "Green",
  "Purple",
  "Magenta",
  "BloodOrange",
  "Orange",
  "Brown",
  "LightYellow",
  "LightGreen",
  "LightBlue",
  "LightPink",
  "DimmedBlue",
  "DimmedOcean",
  "DimmedCyan",
  "DimmedGreen",
  "DimmedPurple",
  "DimmedMagenta",
  "DimmedBloodOrange",
  "DimmedOrange",
  "DimmedBrown",
  "DimmedLightYellow",
  "DimmedLightGreen",
  "DimmedLightBlue",
  "DimmedLightPink",
  "VividBlue",
  "VividOcean",
  "VividCyan",
  "VividGreen",
  "VividPurple",
  "VividMagenta",
  "VividBloodOrange",
  "VividOrange",
  "VividBrown",
  "VividLightYellow",
  "VividLightGreen",
  "VividLightBlue",
  "VividLightPink",
]);
export type CardBackgroundColorKey = z.infer<typeof CardBackgroundColorKeyEnum>;

export const CardStyleSchema = z.object({
  type: CardTypeEnum,
  fontStyle: CardFontStyleEnum.optional(),
  backgroundColorKey: CardBackgroundColorKeyEnum.optional(),
  backgroundColor: z.string().optional(),
  backgroundUrl: z.string().optional(),
  isLightColor: z.boolean(),
});
export type CardStyle = z.infer<typeof CardStyleSchema>;

export const CoverImageSchema = z.object({
  enabled: z.boolean(),
  url: z.string().url().optional(),
  aspectRatio: z.number().optional(),
  attribution: z.string().optional(),
  primaryColor: z.string().optional(),
  imageWidth: z.number().optional(),
  hasTransparency: z.boolean().optional(),
});
export type CoverImage = z.infer<typeof CoverImageSchema>;

export const TextBlockStyleSchema = z.object({
  textStyle: TextStyleEnum,
  fontStyle: FontStyleEnum,
  alignmentStyle: AlignmentStyleEnum,
  cardStyle: CardStyleSchema.optional(),
  coverImage: CoverImageSchema.optional(),
});
export type TextBlockStyle = z.infer<typeof TextBlockStyleSchema>;

export type BaseTextBlock = z.infer<typeof BaseBlockSchema> & {
  type: BlockType;
  content: TextRun[];
  style: TextBlockStyle;
};

const BaseTextBlockSchema = BaseBlockSchema.extend({
  type: z.literal(BlockTypeEnum.enum.Text),
  content: TextRunSchema.array(),
  style: TextBlockStyleSchema,
});

export type TextBlock = BaseTextBlock & {
  subblocks: Block[];
};

export const TextBlockSchema = BaseTextBlockSchema.extend({
  subblocks: BlockSchema.array(),
}) satisfies z.ZodType<TextBlock>;
