import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from "typeorm";
import { Space } from "../spaces/space.model";
import { User } from "../users/user.model";
import { Folder } from "../folders/folder.model";
import { Block } from "../blocks/block.model";
import { Document as DocumentInterface } from "@meadow/shared";

@Entity()
export class Document implements DocumentInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  title: string;

  @Column("text")
  previewUrl: string;

  @Column("boolean", { default: true })
  isEmpty: boolean;

  @ManyToOne(() => User, (user) => user.authoredDocuments)
  author: User;

  @RelationId((document: Document) => document.author)
  authorId: string;

  @ManyToOne(() => Space, (space) => space.documents)
  space: Space;

  @RelationId((document: Document) => document.space)
  spaceId: string;

  @ManyToOne(() => Folder, (folder) => folder.documents)
  folder?: Folder;

  @RelationId((document: Document) => document.folder)
  folderId?: string;

  @OneToOne(() => Block, (block) => block.document)
  rootBlock: Block;

  @RelationId((document: Document) => document.rootBlock)
  rootBlockId: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
