import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { DocumentEntity } from "../documents/document.entity";
import { SpaceEntity } from "../spaces/space.entity";
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
export class BlockEntity {
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

  @ManyToOne(() => SpaceEntity, (space) => space.blocks, {
    onDelete: "CASCADE",
  })
  space: SpaceEntity;

  @RelationId((block: BlockEntity) => block.space)
  spaceId: string;

  @OneToOne(() => DocumentEntity, (document) => document.rootBlock)
  document?: DocumentEntity;

  @RelationId((block: BlockEntity) => block.document)
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

  @ManyToOne(() => BlockEntity, (block) => block.subblocks, {
    onDelete: "CASCADE",
  })
  parentBlock?: BlockEntity;

  @OneToMany(() => BlockEntity, (block) => block.parentBlock)
  subblocks: BlockEntity[];

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
