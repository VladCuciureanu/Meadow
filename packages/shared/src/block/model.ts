import { Space } from "../space/model";
import {
  BlockColor,
  BlockType,
  LineStyle,
  CodeLanguage,
  LayoutStyle,
  TextStyle,
  FontStyle,
  AlignmentStyle,
  CardType,
  CardFontStyle,
  CardBackgroundColorKey,
  TextHighlightColor,
  TextRunLinkType,
  ListStyleType,
  TodoState,
  ImageSizeStyle,
  ImageFillStyle,
} from "./enum";

export type Block =
  | TextBlock
  | DividerBlock
  | CodeBlock
  | ImageBlock
  | VideoBlock
  | FileBlock
  | UrlBlock;

export type BaseBlock = {
  id: string;
  space: Space;
  spaceId: string;
  document: Document;
  documentId: string;
  indentationLevel: number;
  listStyle: ListStyle;
  hasBlockDecoration: boolean;
  hasFocusDecoration: boolean;
  color: BlockColor;
};

export type TextBlock = BaseBlock & {
  type: BlockType.Text;
  content: TextRun[];
  style: TextBlockStyle;
  parentBlock?: Block;
  parentBlockId?: string;
  subblocks: Block[];
};

export interface DividerBlock extends BaseBlock {
  type: BlockType.Divider;
  lineStyle: LineStyle;
}

export interface CodeBlock extends BaseBlock {
  type: BlockType.Code;
  code: string;
  language: CodeLanguage;
}

export interface ResourceBlock extends BaseBlock {
  url?: string;
  previewUrl?: string;
  filename?: string;
}

export interface ImageBlock extends ResourceBlock {
  type: BlockType.Image;
  previewImageStyle: ImageStyle;
}

export interface VideoBlock extends ResourceBlock {
  type: BlockType.Video;
  previewImageStyle: ImageStyle;
}

export interface FileBlock extends ResourceBlock {
  type: BlockType.File;
  layoutStyle: LayoutStyle;
}

export interface UrlBlock extends BaseBlock {
  type: BlockType.Url;
  layoutStyle: LayoutStyle;
  url?: string;
  originalUrl?: string;
  imageUrl?: string;
  title?: string;
  pageDescription?: string;
}

// Various enums and interfaces

export interface TextBlockStyle {
  textStyle: TextStyle;
  fontStyle: FontStyle;
  alignmentStyle: AlignmentStyle;
  cardStyle?: CardStyle;
  coverImage?: CoverImage;
}

export interface CardStyle {
  type: CardType;
  fontStyle?: CardFontStyle;
  backgroundColorKey?: CardBackgroundColorKey;
  backgroundColor?: string;
  backgroundUrl?: string;
  isLightColor: boolean;
}

export interface CoverImage {
  enabled: boolean;
  url?: string;
  aspectRatio?: number;
  attribution?: string;
  primaryColor?: string;
  imageWidth?: number;
  hasTransparency?: boolean;
}

export interface TextRun {
  text: string;
  isBold?: boolean;
  isItalic?: boolean;
  isStrikethrough?: boolean;
  isCode?: boolean;
  highlightColor?: TextHighlightColor;
  link?: TextRunLink;
}

export type TextRunLink = BlockLink | UrlLink | FormulaLink | DateLink;

export interface BlockLink {
  type: TextRunLinkType.Block;
  spaceId: string;
  blockId: string;
}

export interface UrlLink {
  type: TextRunLinkType.Url;
  url: string;
}

export interface FormulaLink {
  type: TextRunLinkType.Formula;
  formula: string;
}

export interface DateLink {
  type: TextRunLinkType.Date;
  date: string;
}

export type ListStyle =
  | NoneListStyle
  | BulletListStyle
  | NumberedListStyle
  | TodoListStyle
  | ToggleListStyle;

export interface NoneListStyle {
  type: ListStyleType.None;
}

export interface BulletListStyle {
  type: ListStyleType.Bullet;
}

export interface NumberedListStyle {
  type: ListStyleType.Numbered;
  ordinal?: number;
}

export interface TodoListStyle {
  type: ListStyleType.Todo;
  state: TodoState;
}

export interface ToggleListStyle {
  type: ListStyleType.Toggle;
}

export interface ImageStyle {
  sizeStyle: ImageSizeStyle;
  fillStyle: ImageFillStyle;
}
