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
  CardType,
  CardFontStyle,
  CardBackgroundColorKey,
  TextHighlightColor,
  TextRunLinkType,
} from "@meadow/shared";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from "typeorm";
import { DocumentEntity } from "../documents/documents.entity";
import { UserEntity } from "../users/users.entity";

@Entity()
export class BlockEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => DocumentEntity, (document) => document.rootBlock, {
    nullable: true,
  })
  document?: DocumentEntity;

  @RelationId((block: BlockEntity) => block.document)
  documentId?: string;

  @Column("enum", { enum: BlockType })
  type: BlockType;

  @Column("int")
  indentationLevel: number;

  @Column("enum", { enum: ListStyleType })
  listStyleType: ListStyleType;

  @Column("int", { nullable: true })
  listStyleOrdinal?: number;

  @Column("enum", { enum: TodoState })
  listStyleState: TodoState;

  @Column("boolean")
  hasBlockDecoration: boolean;

  @Column("boolean")
  hasFocusDecoration: boolean;

  @Column("enum", { enum: BlockColor })
  color: BlockColor;

  // ---------------------- Text Block ----------------------

  @OneToMany(() => TextRunEntity, (textRun) => textRun.block)
  content: TextRunEntity[];

  @Column("enum", { enum: TextStyle })
  styleTextStyle: TextStyle;

  @Column("enum", { enum: FontStyle })
  styleFontStyle: FontStyle;

  @Column("enum", { enum: AlignmentStyle })
  styleAlignmentStyle: AlignmentStyle;

  @Column("enum", { enum: CardType })
  styleCardStyleType: CardType;

  @Column("enum", { enum: CardFontStyle, nullable: true })
  styleCardStyleFontStyle?: CardFontStyle;

  @Column("enum", { enum: CardBackgroundColorKey, nullable: true })
  styleCardStyleBackgroundColorKey?: CardBackgroundColorKey;

  @Column("text", { nullable: true })
  styleCardStyleBackgroundColor?: string;

  @Column("text", { nullable: true })
  styleCardStyleBackgroundUrl?: string;

  @Column("boolean")
  styleCardStyleIsLightColor: boolean;

  @Column("boolean")
  styleCoverImageEnabled: boolean;

  @Column("text", { nullable: true })
  styleCoverImageUrl?: string;

  @Column("int", { nullable: true })
  styleCoverImageAspectRatio?: number;

  @Column("text", { nullable: true })
  styleCoverImageAttribution?: string;

  @Column("text", { nullable: true })
  styleCoverPrimaryColor?: string;

  @Column("int", { nullable: true })
  styleCoverImageWidth?: number;

  @Column("boolean", { nullable: true })
  styleCoverImageHasTransparency?: boolean;

  @ManyToOne(() => BlockEntity, (block) => block.subblocks)
  parentBlock?: BlockEntity;

  @RelationId((block: BlockEntity) => block.parentBlock)
  parentBlockId?: string;

  @OneToMany(() => BlockEntity, (block) => block.parentBlock)
  subblocks: BlockEntity[];

  // ---------------------- Divider Block ----------------------

  @Column("enum", { enum: LineStyle })
  lineStyle: LineStyle;

  // ---------------------- Code Block ----------------------

  @Column("text")
  code: string;

  @Column("enum", { enum: CodeLanguage })
  language: CodeLanguage;

  // ---------------------- Resource Block ----------------------

  @Column("text", { nullable: true })
  url?: string; // Also used in URL block

  @Column("text", { nullable: true })
  previewUrl?: string;

  @Column("text", { nullable: true })
  filename?: string;

  // ---------------------- Image/Video Block ----------------------

  @Column("enum", { enum: ImageSizeStyle })
  previewImageStyleSizeStyle: ImageSizeStyle;

  @Column("enum", { enum: ImageFillStyle })
  previewImageStyleFillStyle: ImageFillStyle;

  // ---------------------- File Block ----------------------

  @Column("enum", { enum: LayoutStyle })
  layoutStyle: LayoutStyle; // Also used in URL block

  // ---------------------- Url Block ----------------------

  @Column("text", { nullable: true })
  originalUrl?: string;

  @Column("text", { nullable: true })
  imageUrl?: string;

  @Column("text", { nullable: true })
  title?: string;

  @Column("text", { nullable: true })
  pageDescription?: string;

  // ---------------------- Audit ----------------------

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity)
  createdBy: UserEntity;

  @RelationId((block: BlockEntity) => block.createdBy)
  createdById: string;

  @UpdateDateColumn()
  modifiedAt: Date;

  @ManyToOne(() => UserEntity)
  modifiedBy: UserEntity;

  @RelationId((block: BlockEntity) => block.modifiedBy)
  modifiedById: string;
}

@Entity()
export class TextRunEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => BlockEntity, (block) => block.content)
  @Index()
  block: BlockEntity;

  @RelationId((textRun: TextRunEntity) => textRun.block)
  blockId: string;

  @Column("text")
  text: string;

  @Column("boolean", { nullable: true })
  isBold?: boolean;

  @Column("boolean", { nullable: true })
  isItalic?: boolean;

  @Column("boolean", { nullable: true })
  isStrikeThrough?: boolean;

  @Column("boolean", { nullable: true })
  isCode?: boolean;

  @Column("enum", { enum: TextHighlightColor, nullable: true })
  highlightColor?: TextHighlightColor;

  @Column("enum", { enum: TextRunLinkType, nullable: true })
  linkType?: TextRunLinkType;

  @Column("text", { nullable: true })
  linkSpaceId?: string;

  @Column("text", { nullable: true })
  linkBlockId?: string;

  @Column("date", { nullable: true })
  linkDate?: Date;

  @Column("text", { nullable: true })
  linkUrl?: string;

  @Column("text", { nullable: true })
  linkFormula?: string;
}
