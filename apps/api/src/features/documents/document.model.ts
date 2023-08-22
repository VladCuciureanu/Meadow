import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Space } from "../spaces/space.model";
import { User } from "../users/user.model";
import { Folder } from "../folders/folder.model";
import { Block } from "../blocks/block.model";

@Entity()
export class Document {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  title: string;

  @Column("text")
  previewUrl: string;

  @Column("boolean", { default: true })
  isEmpty: boolean;

  @ManyToOne(() => User, (user) => user.authoredDocuments, {
    onDelete: "CASCADE",
  })
  author: User;

  @RelationId((document: Document) => document.author)
  authorId: string;

  @ManyToOne(() => Space, (space) => space.documents, {
    onDelete: "CASCADE",
  })
  space: Space;

  @RelationId((document: Document) => document.space)
  spaceId: string;

  @ManyToOne(() => Folder, (folder) => folder.documents, {
    onDelete: "CASCADE",
  })
  folder?: Folder;

  @RelationId((document: Document) => document.folder)
  folderId?: string;

  @OneToOne(() => Block, (block) => block.document)
  @JoinColumn()
  rootBlock: Block;

  @RelationId((document: Document) => document.rootBlock)
  rootBlockId: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
