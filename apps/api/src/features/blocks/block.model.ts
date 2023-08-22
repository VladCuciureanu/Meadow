import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { Document } from "../documents/document.model";
import { Space } from "../spaces/space.model";
import { ListStyle, TextRun, TextBlockStyle, ImageStyle } from "@meadow/shared";
import {
  ListStyleType,
  BlockColor,
  BlockType,
  TextStyle,
  FontStyle,
  AlignmentStyle,
  LineStyle,
  CodeLanguage,
  ImageSizeStyle,
  ImageFillStyle,
  LayoutStyle,
} from "@meadow/shared/src/block/enum";

@Entity()
export class Block {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("int", { default: 0 })
  indentationLevel: number;

  @Column("jsonb", { default: { type: ListStyleType.None } })
  listStyle: ListStyle;

  @Column("boolean", { default: false })
  hasBlockDecoration: boolean;

  @Column("boolean", { default: false })
  hasFocusDecoration: boolean;

  @Column("text", { default: BlockColor.Text })
  color: BlockColor;

  @ManyToOne(() => Space, (space) => space.blocks, {
    onDelete: "CASCADE",
  })
  space: Space;

  @RelationId((block: Block) => block.space)
  spaceId: string;

  @OneToOne(() => Document, (document) => document.rootBlock)
  document?: Document;

  @RelationId((block: Block) => block.document)
  documentId?: string;

  @Column({ type: "enum", enum: BlockType, default: BlockType.Text })
  type: BlockType;

  @Column("jsonb", { default: [] })
  content: TextRun[];

  @Column("jsonb", {
    default: {
      textStyle: TextStyle.Body,
      fontStyle: FontStyle.System,
      alignmentStyle: AlignmentStyle.Left,
    },
  })
  style: TextBlockStyle;

  @ManyToOne(() => Block, (block) => block.subblocks, {
    onDelete: "CASCADE",
  })
  parentBlock?: Block;

  @OneToMany(() => Block, (block) => block.parentBlock)
  subblocks: Block[];

  @Column("text", { default: LineStyle.Regular })
  lineStyle: LineStyle;

  @Column("text", { default: "" })
  code: string;

  @Column("text", { default: CodeLanguage.JavaScript })
  language: CodeLanguage;

  @Column("text", { nullable: true })
  filename?: string;

  @Column("jsonb", {
    default: { sizeStyle: ImageSizeStyle.Auto, fillStyle: ImageFillStyle.Auto },
  })
  previewImageStyle: ImageStyle;

  @Column({ enum: LayoutStyle, default: LayoutStyle.Regular })
  layoutStyle: LayoutStyle;

  @Column("text", { nullable: true })
  url?: string;

  @Column("text", { nullable: true })
  originalUrl?: string;

  @Column("text", { nullable: true })
  imageUrl?: string;

  @Column("text", { nullable: true })
  title?: string;

  @Column("text", { nullable: true })
  pageDescription?: string;
}
