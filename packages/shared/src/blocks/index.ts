import { z } from "zod";
import { PartialDocumentDto } from "../documents";
import { PartialUserDto } from "../users";
import { AlignmentStyle } from "./enums/alignment-style";
import { BlockColor } from "./enums/block-color";
import { BlockType } from "./enums/block-type";
import { CardBackgroundColorKey } from "./enums/card-background-color-key";
import { CardFontStyle } from "./enums/card-font-style";
import { CardType } from "./enums/card-type";
import { CodeLanguage } from "./enums/code-language";
import { FontStyle } from "./enums/font-style";
import { ImageFillStyle } from "./enums/image-fill-style";
import { ImageSizeStyle } from "./enums/image-size-style";
import { LayoutStyle } from "./enums/layout-style";
import { LineStyle } from "./enums/line-style";
import { ListStyleType } from "./enums/list-style-type";
import { TextHighlightColor } from "./enums/text-highlight-color";
import { TextRunLinkType } from "./enums/text-run-link-type";
import { TextStyle } from "./enums/text-style";
import { TodoState } from "./enums/todo-state";

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
  code: string;
  language: CodeLanguage;
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

export type PartialBlockDto = Pick<BlockDto, "id">; // TODO: Add more props when you know what is needed

export type TextRunDto = {
  id: string;
  block: PartialBlockDto;
  text: string;
  isBold?: boolean;
  isItalic?: boolean;
  isStrikeThrough?: boolean;
  isCode?: boolean;
  highlightColor?: TextHighlightColor;
  link: {
    type?: TextRunLinkType;
    spaceId?: string;
    blockId?: string;
    date?: Date;
    url?: string;
    formula?: string;
  };
};

export const HasBlockIdSchema = z.object({
  params: z.object({
    blockId: z.string().uuid(),
  }),
});

export * from "./commands";
export * from "./commands/create-block";
export * from "./commands/update-block";
export * from "./commands/delete-block";
export * from "./enums/alignment-style";
export * from "./enums/block-color";
export * from "./enums/block-type";
export * from "./enums/card-background-color-key";
export * from "./enums/card-font-style";
export * from "./enums/card-type";
export * from "./enums/code-language";
export * from "./enums/font-style";
export * from "./enums/image-fill-style";
export * from "./enums/image-size-style";
export * from "./enums/layout-style";
export * from "./enums/line-style";
export * from "./enums/list-style-type";
export * from "./enums/text-highlight-color";
export * from "./enums/text-run-link-type";
export * from "./enums/text-style";
export * from "./enums/todo-state";
export * from "./queries/get-block";
export * from "./queries/get-blocks";
