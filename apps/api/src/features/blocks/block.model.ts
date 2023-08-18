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
import { Document } from "../documents/document.model";
import { Space } from "../spaces/space.model";
import {
  CodeLanguage,
  BlockColor,
  ImageStyle,
  LayoutStyle,
  LineStyle,
  ListStyle,
  BaseBlock as BaseBlockInterface,
  TextBlock as TextBlockInterface,
  DividerBlock as DividerBlockInterface,
  CodeBlock as CodeBlockInterface,
  ImageBlock as ImageBlockInterface,
  VideoBlock as VideoBlockInterface,
  FileBlock as FileBlockInterface,
  UrlBlock as UrlBlockInterface,
  TextBlockStyle,
  TextRun,
  BlockTypeEnum,
  BlockType,
} from "@meadow/shared";

@Entity()
@TableInheritance({ column: "type" })
export class Block implements BaseBlockInterface {
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

  @Column({ name: "block_type", type: "enum", enum: BlockTypeEnum })
  type: BlockType;
}

@ChildEntity()
export class DividerBlock extends Block implements DividerBlockInterface {
  @Column("text")
  lineStyle: LineStyle;
}

@ChildEntity()
export class CodeBlock extends Block implements CodeBlockInterface {
  @Column("text")
  code: string;

  @Column("text")
  language: CodeLanguage;
}

@ChildEntity()
export class ImageBlock extends Block implements ImageBlockInterface {
  @Column("text", { nullable: true })
  filename?: string;

  @Column("jsonb")
  previewImageStyle: ImageStyle;
}

@ChildEntity()
export class VideoBlock extends Block implements VideoBlockInterface {
  @Column("text", { nullable: true })
  filename?: string;

  @Column("jsonb")
  previewImageStyle: ImageStyle;
}

@ChildEntity()
export class FileBlock extends Block implements FileBlockInterface {
  @Column("text", { nullable: true })
  filename?: string;

  @Column("jsonb")
  layoutStyle: LayoutStyle;
}

@ChildEntity()
export class UrlBlock extends Block implements UrlBlockInterface {
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
export class TextBlock extends Block implements TextBlockInterface {
  @Column("jsonb")
  content: TextRun[];

  @Column("jsonb")
  style: TextBlockStyle;

  @ManyToOne(() => TextBlock, (block) => block.subblocks)
  parentBlock?: Block;

  @OneToMany(() => TextBlock, (block) => block.parentBlock)
  subblocks: Block[];
}
