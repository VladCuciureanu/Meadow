import {
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  TableInheritance,
} from "typeorm";
import { Document } from "../../documents/models/document";
import { Space } from "../../spaces/models/space";
import {
  CodeLanguage,
  BlockColor,
  ImageStyle,
  LayoutStyle,
  LineStyle,
  ListStyle,
  BaseBlock,
  TextBlockStyle,
  TextRun,
} from "@meadow/shared";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Block implements BaseBlock {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("int")
  indentationLevel: number;

  @Column("jsonb")
  listStyle: ListStyle;

  @Column("boolean")
  hasBlockDecoration: boolean;

  @Column("boolean")
  hasFocusDecoration: boolean;

  @Column("text")
  color: BlockColor;

  @ManyToOne(() => Space, (space) => space.blocks)
  space: Space;

  @RelationId((block: Block) => block.space)
  spaceId: string;

  @OneToOne(() => Document, (document) => document.rootBlock)
  document?: Document;

  @RelationId((block: Block) => block.document)
  documentId?: string;
}

@ChildEntity()
export class DividerBlock extends Block {
  @Column("text")
  lineStyle: LineStyle;
}

@ChildEntity()
export class CodeBlock extends Block {
  @Column("text")
  code: string;

  @Column("text")
  language: CodeLanguage;
}

@ChildEntity()
export class ImageBlock extends Block {
  @Column("text", { nullable: true })
  filename?: string;

  @Column("jsonb")
  previewImageStyle: ImageStyle;
}

@ChildEntity()
export class VideoBlock extends Block {
  @Column("text", { nullable: true })
  filename?: string;

  @Column("jsonb")
  previewImageStyle: ImageStyle;
}

@ChildEntity()
export class FileBlock extends Block {
  @Column("text", { nullable: true })
  filename?: string;

  @Column("jsonb")
  layoutStyle: LayoutStyle;
}

@ChildEntity()
export class UrlBlock extends Block {
  @Column("jsonb")
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

@ChildEntity()
export class TextBlock extends Block {
  @Column("jsonb")
  content: TextRun[];

  @Column("jsonb")
  style: TextBlockStyle;

  @ManyToOne(() => TextBlock, (block) => block.subblocks)
  parentBlock?: Block;

  @OneToMany(() => TextBlock, (block) => block.parentBlock)
  subblocks: Block[];
}
