import { BaseEntityDto } from "../common";
import { DocumentDto } from "../document";
import { SpaceDto } from "../space";
import {
  BlockType,
  BlockColor,
  LineStyle,
  CodeLanguage,
  LayoutStyle,
} from "./enum";
import { ListStyle, TextRun, TextBlockStyle, ImageStyle } from "./interfaces";

export interface BlockDto extends BaseEntityDto {
  space: SpaceDto;
  spaceId: string;
  document: DocumentDto;
  documentId: string;
  indentationLevel: number;
  listStyle: ListStyle;
  hasBlockDecoration: boolean;
  hasFocusDecoration: boolean;
  color: BlockColor;
  type: BlockType;
}

export interface TextBlockDto extends BlockDto {
  type: BlockType.Text;
  content: TextRun[];
  style: TextBlockStyle;
  parentBlock?: BlockDto;
  parentBlockId?: string;
  subblocks: BlockDto[];
}

export interface DividerBlockDto extends BlockDto {
  type: BlockType.Divider;
  lineStyle: LineStyle;
}

export interface CodeBlockDto extends BlockDto {
  type: BlockType.Code;
  code: string;
  language: CodeLanguage;
}
export interface ResourceBlockDto extends BlockDto {
  url?: string;
  previewUrl?: string;
  filename?: string;
}

export interface ImageBlock extends ResourceBlockDto {
  type: BlockType.Image;
  previewImageStyle: ImageStyle;
}

export interface VideoBlock extends ResourceBlockDto {
  type: BlockType.Video;
  previewImageStyle: ImageStyle;
}

export interface FileBlock extends ResourceBlockDto {
  type: BlockType.File;
  layoutStyle: LayoutStyle;
}

export interface UrlBlockDto extends BlockDto {
  type: BlockType.Url;
  layoutStyle: LayoutStyle;
  url?: string;
  originalUrl?: string;
  imageUrl?: string;
  title?: string;
  pageDescription?: string;
}
