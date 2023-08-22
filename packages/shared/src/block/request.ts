import { z } from "zod";
import {
  AlignmentStyle,
  BlockColor,
  BlockType,
  CardBackgroundColorKey,
  CardFontStyle,
  CardType,
  CodeLanguage,
  FontStyle,
  ImageFillStyle,
  ImageSizeStyle,
  LayoutStyle,
  LineStyle,
  ListStyleType,
  TextHighlightColor,
  TextRunLinkType,
  TextStyle,
  TodoState,
} from "..";

const HasBlockId = z.object({
  params: z.object({
    blockId: z
      .string({ required_error: "Block ID is required." })
      .uuid("Invalid block ID."),
  }),
});

const NoneListStyleSchema = z.object({
  type: z.literal(ListStyleType.None),
});

const BulletListStyleSchema = z.object({
  type: z.literal(ListStyleType.Bullet),
});

const NumberedListStyleSchema = z.object({
  type: z.literal(ListStyleType.Numbered),
  ordinal: z.number().optional(),
});

const TodoListStyleSchema = z.object({
  type: z.literal(ListStyleType.Todo),
  state: z.nativeEnum(TodoState),
});

const ToggleListStyleSchema = z.object({
  type: z.literal(ListStyleType.Toggle),
});

const ListStyleSchema = z.discriminatedUnion("type", [
  NoneListStyleSchema,
  BulletListStyleSchema,
  NumberedListStyleSchema,
  TodoListStyleSchema,
  ToggleListStyleSchema,
]);

const BaseMutableFields = z.object({
  spaceId: z.string().uuid(),
  documentId: z.string().uuid(),
  indentationLevel: z.number().optional(),
  listStyle: ListStyleSchema.optional(),
  hasBlockDecoration: z.boolean().optional(),
  hasFocusDecoration: z.boolean().optional(),
  color: z.nativeEnum(BlockColor).optional(),
});

const CardStyleSchema = z.object({
  type: z.nativeEnum(CardType),
  fontStyle: z.nativeEnum(CardFontStyle).optional(),
  backgroundColorKey: z.nativeEnum(CardBackgroundColorKey).optional(),
  backgroundColor: z.string().optional(),
  backgroundUrl: z.string().url().optional(),
  isLightColor: z.boolean(),
});

const CoverImageSchema = z.object({
  enabled: z.boolean(),
  url: z.string().url().optional(),
  aspectRatio: z.number().optional(),
  attribution: z.string().optional(),
  primaryColor: z.string().optional(),
  imageWidth: z.number().optional(),
  hasTransparency: z.boolean().optional(),
});

const TextBlockStyleSchema = z.object({
  textStyle: z.nativeEnum(TextStyle),
  fontStyle: z.nativeEnum(FontStyle),
  alignmentStyle: z.nativeEnum(AlignmentStyle),
  cardStyle: CardStyleSchema.optional(),
  coverImage: CoverImageSchema.optional(),
});

const BlockLinkSchema = z.object({
  type: z.literal(TextRunLinkType.Block),
  spaceId: z.string(),
  blockId: z.string(),
});

const UrlLinkSchema = z.object({
  type: z.literal(TextRunLinkType.Url),
  url: z.string(),
});

const FormulaLink = z.object({
  type: z.literal(TextRunLinkType.Formula),
  formula: z.string(),
});

const DateLink = z.object({
  type: z.literal(TextRunLinkType.Date),
  date: z.string(),
});

const TextRunLinkSchema = z.discriminatedUnion("type", [
  BlockLinkSchema,
  UrlLinkSchema,
  FormulaLink,
  DateLink,
]);

const TextRunSchema = z.object({
  text: z.string(),
  isBold: z.boolean().optional(),
  isItalic: z.boolean().optional(),
  isStrikethrough: z.boolean().optional(),
  isCode: z.boolean().optional(),
  highlightColor: z.nativeEnum(TextHighlightColor).optional(),
  link: TextRunLinkSchema.optional(),
});

const TextMutableFields = BaseMutableFields.extend({
  type: z.literal(BlockType.Text),
  content: TextRunSchema.array().optional(),
  style: TextBlockStyleSchema.optional(),
  parentBlockId: z.string().uuid().optional(),
});

const DividerMutableFields = BaseMutableFields.extend({
  type: z.literal(BlockType.Divider),
  lineStyle: z.nativeEnum(LineStyle).optional(),
});

const CodeMutableFields = BaseMutableFields.extend({
  type: z.literal(BlockType.Code),
  code: z.string().optional(),
  language: z.nativeEnum(CodeLanguage).optional(),
});

const ResourceMutableFields = BaseMutableFields.extend({
  url: z.string().url().optional(),
  previewUrl: z.string().url().optional(),
  filename: z.string().optional(),
});

const ImageStyleSchema = z.object({
  sizeStyle: z.nativeEnum(ImageSizeStyle),
  fillStyle: z.nativeEnum(ImageFillStyle),
});

const ImageMutableFields = ResourceMutableFields.extend({
  type: z.literal(BlockType.Image),
  previewImageStyle: ImageStyleSchema,
});

const VideoMutableFields = ResourceMutableFields.extend({
  type: z.literal(BlockType.Video),
  previewImageStyle: ImageStyleSchema,
});

const FileMutableFields = ResourceMutableFields.extend({
  type: z.literal(BlockType.File),
  layoutStyle: z.nativeEnum(LayoutStyle).optional(),
});

const UrlMutableFields = BaseMutableFields.extend({
  type: z.literal(BlockType.Url),
  layoutStyle: z.nativeEnum(LayoutStyle).optional(),
  url: z.string().url().optional(),
  originalUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  title: z.string().optional(),
  pageDescription: z.string().optional(),
});

const MutableFields = z.discriminatedUnion("type", [
  TextMutableFields.strict(),
  DividerMutableFields.strict(),
  CodeMutableFields.strict(),
  ImageMutableFields.strict(),
  VideoMutableFields.strict(),
  FileMutableFields.strict(),
  UrlMutableFields.strict(),
]);

const PartialMutableFields = z.discriminatedUnion("type", [
  TextMutableFields.deepPartial().strict(),
  DividerMutableFields.deepPartial().strict(),
  CodeMutableFields.deepPartial().strict(),
  ImageMutableFields.deepPartial().strict(),
  VideoMutableFields.deepPartial().strict(),
  FileMutableFields.deepPartial().strict(),
  UrlMutableFields.deepPartial().strict(),
]);

export const CreateBlockSchema = z.object({
  body: MutableFields,
});

export const UpdateBlockSchema = HasBlockId.extend({
  body: MutableFields,
});

export const PatchBlockSchema = HasBlockId.extend({
  body: PartialMutableFields,
});

export const DeleteBlockSchema = HasBlockId;

export type CreateBlockRequest = z.infer<typeof CreateBlockSchema>;
export type UpdateBlockRequest = z.infer<typeof UpdateBlockSchema>;
export type PatchBlockRequest = z.infer<typeof PatchBlockSchema>;
export type DeleteBlockRequest = z.infer<typeof DeleteBlockSchema>;
