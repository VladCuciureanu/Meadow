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
  BlockType,
} from "@meadow/shared";

@Entity()
export class Block
  implements
    BaseBlockInterface,
    Omit<TextBlockInterface, "type">,
    Omit<DividerBlockInterface, "type">,
    Omit<CodeBlockInterface, "type">,
    Omit<ImageBlockInterface, "type">,
    Omit<VideoBlockInterface, "type">,
    Omit<FileBlockInterface, "type">,
    Omit<UrlBlockInterface, "type">
{
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

  @Column({ type: "enum", enum: BlockType })
  type: BlockType;

  @Column("jsonb")
  content: TextRun[];

  @Column("jsonb")
  style: TextBlockStyle;

  @ManyToOne(() => Block, (block) => block.subblocks)
  parentBlock?: Block;

  @OneToMany(() => Block, (block) => block.parentBlock)
  subblocks: Block[];

  @Column("text")
  lineStyle: LineStyle;

  @Column("text")
  code: string;

  @Column("text")
  language: CodeLanguage;

  @Column("text", { nullable: true })
  filename?: string;

  @Column("jsonb")
  previewImageStyle: ImageStyle;

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
