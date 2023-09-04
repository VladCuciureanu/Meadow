import { PartialDocumentDto } from "../document";
import { PartialUserDto } from "../user";

export type BlockDto = {
  id: string;
  document?: PartialDocumentDto;
  type: BlockType;
  indentationLevel: number;
  listStyle: {
    type: ListStyleType;
    ordinal?: number;
    state: TodoState;
  };
  hasBlockDecoration: boolean;
  hasFocusDecoration: boolean;
  color: BlockColor;
  content: TextRunDto[];
  style: {
    textStyle: TextStyle;
    fontStyle: FontStyle;
    alignmentStyle: AlignmentStyle;
    cardStyle: {
      type: CardType;
      fontStyle?: CardFontStyle;
      backgroundColorKey?: CardBackgroundColorKey;
      backgroundColor?: string;
      backgroundUrl?: string;
      isLightColor: boolean;
    };
    coverImage: {
      enabled: boolean;
      url?: string;
      aspectRatio?: number;
      attribution?: string;
      primaryColor?: string;
      imageWidth?: number;
      hasTransparency?: boolean;
    };
  };
  parentBlock?: PartialBlockDto;
  subblocks: PartialBlockDto[];
  lineStyle: LineStyle;
  code?: string;
  language?: CodeLanguage;
  url?: string;
  previewUrl?: string;
  filename?: string;
  previewImageStyle: {
    sizeStyle: ImageSizeStyle;
    fillStyle: ImageFillStyle;
  };
  layoutStyle: LayoutStyle;
  originalUrl?: string;
  imageUrl?: string;
  title?: string;
  pageDescription?: string;
  createdAt: Date;
  createdBy: PartialUserDto;
  modifiedAt: Date;
  modifiedBy: PartialUserDto;
};

export type PartialBlockDto = Pick<
  BlockDto,
  | "id"
  | "type"
  | "indentationLevel"
  | "listStyle"
  | "hasBlockDecoration"
  | "hasFocusDecoration"
  | "color"
  // | "content"
  | "style"
>;

export type TextRunDto = {
  id: string;
  text: string;
  isBold?: boolean;
  isItalic?: boolean;
  isStrikethrough?: boolean;
  isCode?: boolean;
  highlightColor?: TextHighlightColor;
  linkType?: TextRunLinkType;
  linkSpaceId?: string;
  linkBlockId?: string;
  linkDate?: Date;
  linkUrl?: string;
  linkFormula?: string;
  block: PartialBlockDto;
};

export enum TextRunLinkType {
  Block,
  Url,
  Formula,
  Date,
}

export enum TextHighlightColor {
  Yellow,
  Lime,
  Green,
  Cyan,
  Blue,
  Purple,
  Pink,
  Red,
  Grey,
  BeachGradient,
  NightSkyGradient,
  SunsetGradient,
  OrangeGradient,
  GoldGradient,
}

export enum ListStyleType {
  None,
  Bullet,
  Numbered,
  Todo,
  Toggle,
}

export enum TodoState {
  Unchecked,
  Checked,
  Canceled,
}

export enum BlockColor {
  Text,
  Text1,
  Text2,
  Text3,
  Text4,
  Grey,
  Grey1,
  Grey2,
  Grey3,
  Grey4,
  Pink,
  Pink1,
  Pink2,
  Pink3,
  Pink4,
  Purple,
  Purple1,
  Purple2,
  Purple3,
  Purple4,
  Blue,
  Blue1,
  Blue2,
  Blue3,
  Blue4,
  Cyan,
  Cyan1,
  Cyan2,
  Cyan3,
  Cyan4,
  Green,
  Green1,
  Green2,
  Green3,
  Green4,
  Olive,
  Olive1,
  Olive2,
  Olive3,
  Olive4,
  Red,
  Red1,
  Red2,
  Red3,
  Red4,
  Yellow,
  Yellow1,
  Yellow2,
  Yellow3,
  Yellow4,
}

export enum BlockType {
  Text,
  Divider,
  Code,
  Image,
  Video,
  File,
  Url,
}

export enum TextStyle {
  Title,
  Subtitle,
  Heading,
  Strong,
  Body,
  Caption,
  Card,
  Page,
}

export enum FontStyle {
  SystemRounded,
  SystemSerif,
  System,
  SystemMono,
}

export enum AlignmentStyle {
  Left,
  Right,
  Center,
}

export enum CardType {
  Subtle,
  Small,
  Square,
  Wide,
  Large,
}

export enum CardFontStyle {
  Regular,
  Serif,
  Rounded,
}

export enum CardBackgroundColorKey {
  White,
  DarkGray,
  Blue,
  Ocean,
  Cyan,
  Green,
  Purple,
  Magenta,
  BloodOrange,
  Orange,
  Brown,
  LightYellow,
  LightGreen,
  LightBlue,
  LightPink,
  DimmedBlue,
  DimmedOcean,
  DimmedCyan,
  DimmedGreen,
  DimmedPurple,
  DimmedMagenta,
  DimmedBloodOrange,
  DimmedOrange,
  DimmedBrown,
  DimmedLightYellow,
  DimmedLightGreen,
  DimmedLightBlue,
  DimmedLightPink,
  VividBlue,
  VividOcean,
  VividCyan,
  VividGreen,
  VividPurple,
  VividMagenta,
  VividBloodOrange,
  VividOrange,
  VividBrown,
  VividLightYellow,
  VividLightGreen,
  VividLightBlue,
  VividLightPink,
}

export enum LineStyle {
  Strong,
  Regular,
  Light,
  ExtraLight,
}

export enum CodeLanguage {
  Bash,
  Ada,
  CPP,
  CSharp,
  CSS,
  Dart,
  Go,
  Groovy,
  Haskell,
  Html,
  Java,
  JavaScript,
  JSON,
  Julia,
  Kotlin,
  Lua,
  Markdown,
  MathFormula,
  Matlab,
  ObjectiveC,
  Perl,
  PHP,
  Prolog,
  Python,
  R,
  Ruby,
  Rust,
  Scala,
  Shell,
  SQL,
  Swift,
  TypeScript,
  VBNet,
  XML,
  YAML,
  Other,
}

export enum ImageFillStyle {
  Auto,
  Fit,
  Fill,
}

export enum ImageSizeStyle {
  Auto,
  Large,
}

export enum LayoutStyle {
  Regular,
  Small,
  Card,
}
