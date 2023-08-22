import {
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
