import { z } from "zod";
import {
  AlignmentStyle,
  BaseBlock,
  Block,
  BlockColor,
  BlockType,
  BulletListStyle,
  CardBackgroundColorKey,
  CardFontStyle,
  CardStyle,
  CardType,
  CodeLanguage,
  CoverImage,
  DividerBlock,
  Document,
  FontStyle,
  ImageFillStyle,
  ImageSizeStyle,
  ImageStyle,
  LayoutStyle,
  LineStyle,
  ListStyle,
  ListStyleType,
  NoneListStyle,
  NumberedListStyle,
  Space,
  TextBlock,
  TextBlockStyle,
  TextHighlightColor,
  TextRun,
  TextRunLinkType,
  TextStyle,
  TodoListStyle,
  TodoState,
  ToggleListStyle,
} from "../..";
import { SpaceSchema } from "./space";
import { DocumentSchema } from "./document";

const NoneListStyleSchema = z.object({
  type: z.literal(ListStyleType.None),
}) satisfies z.ZodType<NoneListStyle>;

const BulletListStyleSchema = z.object({
  type: z.literal(ListStyleType.Bullet),
}) satisfies z.ZodType<BulletListStyle>;

const NumberedListStyleSchema = z.object({
  type: z.literal(ListStyleType.Numbered),
  ordinal: z.number().optional(),
}) satisfies z.ZodType<NumberedListStyle>;

const TodoListStyleSchema = z.object({
  type: z.literal(ListStyleType.Todo),
  state: z.nativeEnum(TodoState),
}) satisfies z.ZodType<TodoListStyle>;

const ToggleListStyleSchema = z.object({
  type: z.literal(ListStyleType.Toggle),
}) satisfies z.ZodType<ToggleListStyle>;

const ListStyleSchema = z.discriminatedUnion("type", [
  NoneListStyleSchema,
  BulletListStyleSchema,
  NumberedListStyleSchema,
  TodoListStyleSchema,
  ToggleListStyleSchema,
]);

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

const TextRunSchema: z.ZodType<TextRun> = z.object({
  text: z.string(),
  isBold: z.boolean().optional(),
  isItalic: z.boolean().optional(),
  isStrikethrough: z.boolean().optional(),
  isCode: z.boolean().optional(),
  highlightColor: z.nativeEnum(TextHighlightColor).optional(),
  link: TextRunLinkSchema.optional(),
});

const CardStyleSchema: z.ZodType<CardStyle> = z.object({
  type: z.nativeEnum(CardType),
  fontStyle: z.nativeEnum(CardFontStyle).optional(),
  backgroundColorKey: z.nativeEnum(CardBackgroundColorKey).optional(),
  backgroundColor: z.string().optional(),
  backgroundUrl: z.string().url().optional(),
  isLightColor: z.boolean(),
});

const CoverImageSchema: z.ZodType<CoverImage> = z.object({
  enabled: z.boolean(),
  url: z.string().url().optional(),
  aspectRatio: z.number().optional(),
  attribution: z.string().optional(),
  primaryColor: z.string().optional(),
  imageWidth: z.number().optional(),
  hasTransparency: z.boolean().optional(),
});

const TextBlockStyleSchema: z.ZodType<TextBlockStyle> = z.object({
  textStyle: z.nativeEnum(TextStyle),
  fontStyle: z.nativeEnum(FontStyle),
  alignmentStyle: z.nativeEnum(AlignmentStyle),
  cardStyle: CardStyleSchema.optional(),
  coverImage: CoverImageSchema.optional(),
});

const ImageStyleSchema: z.ZodType<ImageStyle> = z.object({
  sizeStyle: z.nativeEnum(ImageSizeStyle),
  fillStyle: z.nativeEnum(ImageFillStyle),
});

export const BaseBlockSchema = z.object({
  id: z.string().uuid(),
  indentationLevel: z.number(),
  listStyle: ListStyleSchema,
  hasBlockDecoration: z.boolean(),
  hasFocusDecoration: z.boolean(),
  color: z.nativeEnum(BlockColor),
  space: SpaceSchema,
  spaceId: z.string().uuid(),
  document: DocumentSchema,
  documentId: z.string().uuid().optional(),
  type: z.nativeEnum(BlockType),
}) satisfies z.ZodType<BaseBlock>;

export const TextBlockSchema: TextBlockSchemaType = BaseBlockSchema.extend({
  type: z.literal(BlockType.Text),
  content: TextRunSchema.array(),
  style: TextBlockStyleSchema,
  parentBlock: z.lazy(() => BlockSchema.optional()),
  parentBlockId: z.string().uuid().optional(),
  subblocks: z.lazy(() => BlockSchema.array()),
});

export const DividerBlockSchema = BaseBlockSchema.extend({
  type: z.literal(BlockType.Divider),
  lineStyle: z.nativeEnum(LineStyle),
}) satisfies z.ZodType<DividerBlock>;

export const CodeBlockSchema = BaseBlockSchema.extend({
  type: z.literal(BlockType.Code),
  code: z.string(),
  language: z.nativeEnum(CodeLanguage),
});

const ResourceBlockSchema = BaseBlockSchema.extend({
  url: z.string().url().optional(),
  previewUrl: z.string().url().optional(),
  filename: z.string().optional(),
});

export const ImageBlock = ResourceBlockSchema.extend({
  type: z.literal(BlockType.Image),
  previewImageStyle: ImageStyleSchema,
});

export const VideoBlock = ResourceBlockSchema.extend({
  type: z.literal(BlockType.Video),
  previewImageStyle: ImageStyleSchema,
});

export const FileBlock = ResourceBlockSchema.extend({
  type: z.literal(BlockType.File),
  layoutStyle: z.nativeEnum(LayoutStyle),
});

export const UrlBlock = BaseBlockSchema.extend({
  type: z.literal(BlockType.Url),
  layoutStyle: z.nativeEnum(LayoutStyle),
  url: z.string().url().optional(),
  originalUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  title: z.string().optional(),
  pageDescription: z.string().optional(),
});

export const BlockSchema = z.discriminatedUnion("type", [
  TextBlockSchema,
  DividerBlockSchema,
  CodeBlockSchema,
  ImageBlock,
  VideoBlock,
  FileBlock,
  UrlBlock,
]);

// Fixing some type inferrence issues
type TextBlockSchemaType = z.ZodObject<
  {
    id: z.ZodString;
    indentationLevel: z.ZodNumber;
    listStyle: z.ZodType<ListStyle, z.ZodTypeDef, ListStyle>;
    hasBlockDecoration: z.ZodBoolean;
    hasFocusDecoration: z.ZodBoolean;
    color: z.ZodNativeEnum<typeof BlockColor>;
    space: z.ZodType<Space, z.ZodTypeDef, Space>;
    spaceId: z.ZodString;
    document: z.ZodType<Document, z.ZodTypeDef, Document>;
    documentId: z.ZodOptional<z.ZodString>;
    type: z.ZodLiteral<BlockType.Text>;
    content: z.ZodArray<z.ZodType<TextRun, z.ZodTypeDef, TextRun>, "many">;
    style: z.ZodType<TextBlockStyle, z.ZodTypeDef, TextBlockStyle>;
    parentBlock: z.ZodLazy<
      z.ZodOptional<z.ZodType<Block, z.ZodTypeDef, Block>>
    >;
    parentBlockId: z.ZodOptional<z.ZodString>;
    subblocks: z.ZodLazy<
      z.ZodArray<z.ZodType<Block, z.ZodTypeDef, Block>, "many">
    >;
  },
  "strip",
  z.ZodTypeAny,
  TextBlock,
  TextBlock
>;
