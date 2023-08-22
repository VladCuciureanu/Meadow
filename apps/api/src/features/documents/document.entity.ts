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
import { SpaceEntity } from "../spaces/space.entity";
import { UserEntity } from "../users/user.entity";
import { FolderEntity } from "../folders/folder.entity";
import { BlockEntity } from "../blocks/block.entity";

@Entity()
export class DocumentEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  title: string;

  @Column("text")
  previewUrl: string;

  @Column("boolean", { default: true })
  isEmpty: boolean;

  @ManyToOne(() => UserEntity, (user) => user.authoredDocuments, {
    onDelete: "CASCADE",
  })
  author: UserEntity;

  @RelationId((document: DocumentEntity) => document.author)
  authorId: string;

  @ManyToOne(() => SpaceEntity, (space) => space.documents, {
    onDelete: "CASCADE",
  })
  space: SpaceEntity;

  @RelationId((document: DocumentEntity) => document.space)
  spaceId: string;

  @ManyToOne(() => FolderEntity, (folder) => folder.documents, {
    onDelete: "CASCADE",
  })
  folder?: FolderEntity;

  @RelationId((document: DocumentEntity) => document.folder)
  folderId?: string;

  @OneToOne(() => BlockEntity, (block) => block.document)
  @JoinColumn()
  rootBlock: BlockEntity;

  @RelationId((document: DocumentEntity) => document.rootBlock)
  rootBlockId: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
