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
  TodoState,
} from "@meadow/shared/src/block/enum";

@Entity()
export class BlockEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("int", { default: 0 })
  indentationLevel: number;

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
  document: DocumentEntity;

  @RelationId((block: BlockEntity) => block.document)
  documentId: string;

  @Column({ type: "enum", enum: BlockType, default: BlockType.Text })
  type: BlockType;

  //-------------------- List Style --------------------
  @Column({ enum: ListStyleType, default: ListStyleType.None })
  listStyleType: ListStyleType;

  @Column("int", { default: 0 })
  listStyleOrdinal: number;

  @Column({ enum: TodoState, default: TodoState.Unchecked })
  listStyleTodoState: TodoState;

  //-------------------- Text Block --------------------

  @Column("jsonb", { default: [] })
  content: TextRun[];

  @Column({ enum: TextStyle, default: TextStyle.Body })
  textStyle: TextStyle;

  @Column({ enum: FontStyle, default: FontStyle.System })
  fontStyle: FontStyle;

  @Column({ enum: AlignmentStyle, default: AlignmentStyle.Left })
  alignmentStyle: AlignmentStyle;

  @ManyToOne(() => BlockEntity, (block) => block.subblocks, {
    onDelete: "CASCADE",
  })
  parentBlock?: BlockEntity;

  @OneToMany(() => BlockEntity, (block) => block.parentBlock)
  subblocks: BlockEntity[];

  //------------------- Divider Block -------------------

  @Column("text", { default: LineStyle.Regular })
  lineStyle: LineStyle;

  //-------------------- Code Block --------------------

  @Column("text", { nullable: true })
  code?: string;

  @Column("text", { default: CodeLanguage.JavaScript })
  language: CodeLanguage;

  //------------------ Resource Block ------------------

  @Column("text", { nullable: true })
  filename?: string;

  @Column({ enum: ImageSizeStyle, default: ImageSizeStyle.Auto })
  previewImageSizeStyle: ImageSizeStyle;

  @Column({ enum: ImageFillStyle, default: ImageFillStyle.Auto })
  previewImageFillStyle: ImageFillStyle;

  //-------------------- File Block --------------------

  @Column({ enum: LayoutStyle, default: LayoutStyle.Regular })
  layoutStyle: LayoutStyle;

  //-------------------- Url Block --------------------

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
