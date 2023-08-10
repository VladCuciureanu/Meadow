export * from "./zod";

// Models

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  imgUrl?: string;
  teams: Team[];
}

export interface Team {
  id: string;
  name: string;
  imgUrl?: string;
  members: User[];
  spaces: Space[];
}

export type Space = {
  id: string;
  name: string;
  imgUrl?: string;
  blocks: BaseBlock[];
  documents: Document[];
  folders: Folder[];
  rootFolderOrder: string[];
  team: Team;
};

export type Document = {
  id: string;
  title: string;
  previewUrl: string;
  isEmpty: boolean;
  author: User;
  authorId: string;
  space: Space;
  spaceId: string;
  folder?: Folder;
  folderId?: string;
  rootBlock: BaseBlock;
  rootBlockId: string;
  created: Date;
  updated: Date;
};

export type Folder = {
  id: string;
  name: string;
  description?: string;
  icon: FolderIconConfig;
  itemOrder: string[];
  documents: Document[];
  parentFolder?: Folder;
  parentFolderId?: string;
  childrenFolders: Folder[];
  space?: Space;
  spaceId?: string;
  created: Date;
  updated: Date;
};

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
  spaceId?: string;
  documentId?: string;
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
}

export interface ImageBlock extends ResourceBlock {
  type: BlockType.Image;
  previewImageStyle: ImageStyle;
  filename?: string;
}

export interface VideoBlock extends ResourceBlock {
  type: BlockType.Video;
  previewImageStyle: ImageStyle;
  filename?: string;
}

export interface FileBlock extends ResourceBlock {
  type: BlockType.File;
  layoutStyle: LayoutStyle;
  filename?: string;
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

// Helper interfaces

export interface FolderIconConfig {
  tintColor?: string;
  type: FolderIconType;
  value: string;
}

export enum FolderIconType {
  Emoji = "emoji",
  LocalImage = "localImage",
}

export interface DocumentUserAttributes {
  isStarred: boolean;
}

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

export enum CardType {
  Subtle = "subtle",
  Small = "small",
  Square = "square",
  Wide = "wide",
  Large = "large",
}

export enum CardFontStyle {
  Regular = "regular",
  Serif = "serif",
  Rounded = "rounded",
}

export enum CardBackgroundColorKey {
  White = "white",
  DarkGray = "dark-gray",
  Blue = "blue",
  Ocean = "ocean",
  Cyan = "cyan",
  Green = "green",
  Purple = "purple",
  Magenta = "magenta",
  BloodOrange = "bloodOrange",
  Orange = "orange",
  Brown = "brown",
  LightYellow = "lightYellow",
  LightGreen = "lightGreen",
  LightBlue = "lightBlue",
  LightPink = "lightPink",
  DimmedBlue = "blue_dimmed",
  DimmedOcean = "ocean_dimmed",
  DimmedCyan = "cyan_dimmed",
  DimmedGreen = "green_dimmed",
  DimmedPurple = "purple_dimmed",
  DimmedMagenta = "magenta_dimmed",
  DimmedBloodOrange = "bloodOrange_dimmed",
  DimmedOrange = "orange_dimmed",
  DimmedBrown = "brown_dimmed",
  DimmedLightYellow = "lightYellow_dimmed",
  DimmedLightGreen = "lightGreen_dimmed",
  DimmedLightBlue = "lightBlue_dimmed",
  DimmedLightPink = "lightPink_dimmed",
  VividBlue = "blue_vivid",
  VividOcean = "ocean_vivid",
  VividCyan = "cyan_vivid",
  VividGreen = "green_vivid",
  VividPurple = "purple_vivid",
  VividMagenta = "magenta_vivid",
  VividBloodOrange = "bloodOrange_vivid",
  VividOrange = "orange_vivid",
  VividBrown = "brown_vivid",
  VividLightYellow = "lightYellow_vivid",
  VividLightGreen = "lightGreen_vivid",
  VividLightBlue = "lightBlue_vivid",
  VividLightPink = "lightPink_vivid",
}

// Block types returned by queries
export enum BlockType {
  Text = "text",
  Divider = "divider",
  Code = "code",
  Image = "image",
  Video = "video",
  File = "file",
  Url = "url",
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

export enum TextRunLinkType {
  Block = "block",
  Url = "url",
  Formula = "formula",
  Date = "date",
}
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

export enum ListStyleType {
  None = "none",
  Bullet = "bullet",
  Numbered = "numbered",
  Todo = "todo",
  Toggle = "toggle",
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

export enum TodoState {
  Unchecked = "unchecked",
  Checked = "checked",
  Canceled = "canceled",
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

export enum TextStyle {
  Title = "title",
  Subtitle = "subtitle",
  Heading = "heading",
  Strong = "strong",
  Body = "body",
  Caption = "caption",
  Card = "card",
  Page = "page",
}

export enum FontStyle {
  SystemRounded = "system-rounded",
  SystemSerif = "system-serif",
  System = "system",
  SystemMono = "system-mono",
}

export enum AlignmentStyle {
  Left = "left",
  Right = "right",
  Center = "center",
}
export enum ImageFillStyle {
  Auto = "auto",
  Fit = "fit",
  Fill = "fill",
}
export enum ImageSizeStyle {
  Auto = "auto",
  Large = "large",
}
export enum LineStyle {
  Strong = "strong",
  Regular = "regular",
  Light = "light",
  ExtraLight = "extraLight",
}
export enum LayoutStyle {
  Regular = "regular",
  Small = "small",
  Card = "card",
}
export enum CodeLanguage {
  Bash = "Bash",
  Ada = "ada",
  CPP = "cpp",
  CSharp = "cs",
  CSS = "css",
  Dart = "dart",
  Go = "go",
  Groovy = "groovy",
  Haskell = "haskell",
  Html = "html",
  Java = "java",
  JavaScript = "javascript",
  JSON = "json",
  Julia = "julia",
  Kotlin = "kotlin",
  Lua = "lua",
  Markdown = "markdown",
  MathFormula = "math_formula",
  Matlab = "matlab",
  ObjectiveC = "objectivec",
  Perl = "perl",
  PHP = "php",
  Prolog = "prolog",
  Python = "python",
  R = "r",
  Ruby = "ruby",
  Rust = "rust",
  Scala = "scala",
  Shell = "shell",
  SQL = "sql",
  Swift = "swift",
  TypeScript = "typescript",
  VBNet = "vbnet",
  XML = "xml",
  YAML = "yaml",
  Other = "other",
}

export enum TextHighlightColor {
  Yellow = "yellow",
  Lime = "lime",
  Green = "green",
  Cyan = "cyan",
  Blue = "blue",
  Purple = "purple",
  Pink = "pink",
  Red = "red",
  Grey = "grey",
  BeachGradient = "beachGradient",
  NightSkyGradient = "nightSkyGradient",
  SunsetGradient = "sunsetGradient",
  OrangeGradient = "orangeGradient",
  GoldGradient = "goldGradient",
}
export enum BlockColor {
  Text = "text",
  Text1 = "text1",
  Text2 = "text2",
  Text3 = "text3",
  Text4 = "text4",
  Grey = "grey",
  Grey1 = "grey1",
  Grey2 = "grey2",
  Grey3 = "grey3",
  Grey4 = "grey4",
  Pink = "pink",
  Pink1 = "pink1",
  Pink2 = "pink2",
  Pink3 = "pink3",
  Pink4 = "pink4",
  Purple = "purple",
  Purple1 = "purple1",
  Purple2 = "purple2",
  Purple3 = "purple3",
  Purple4 = "purple4",
  Blue = "blue",
  Blue1 = "blue1",
  Blue2 = "blue2",
  Blue3 = "blue3",
  Blue4 = "blue4",
  Cyan = "cyan",
  Cyan1 = "cyan1",
  Cyan2 = "cyan2",
  Cyan3 = "cyan3",
  Cyan4 = "cyan4",
  Green = "green",
  Green1 = "green1",
  Green2 = "green2",
  Green3 = "green3",
  Green4 = "green4",
  Olive = "olive",
  Olive1 = "olive1",
  Olive2 = "olive2",
  Olive3 = "olive3",
  Olive4 = "olive4",
  Red = "red",
  Red1 = "red1",
  Red2 = "red2",
  Red3 = "red3",
  Red4 = "red4",
  Yellow = "yellow",
  Yellow1 = "yellow1",
  Yellow2 = "yellow2",
  Yellow3 = "yellow3",
  Yellow4 = "yellow4",
}
