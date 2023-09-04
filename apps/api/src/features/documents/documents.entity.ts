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
import { SpaceEntity } from "../spaces/spaces.entity";
import { UserEntity } from "../users/users.entity";
import { FolderEntity } from "../folders/folders.entity";
import { BlockEntity } from "../blocks/blocks.entity";

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

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE",
  })
  author: UserEntity;

  @RelationId((document: DocumentEntity) => document.author)
  authorId: string;

  @ManyToOne(() => FolderEntity, (folder) => folder.documents, {
    onDelete: "CASCADE",
  })
  folder: FolderEntity;

  @RelationId((document: DocumentEntity) => document.folder)
  folderId: string;

  @OneToOne(() => BlockEntity, (block) => block.document)
  @JoinColumn()
  rootBlock: BlockEntity;

  @RelationId((document: DocumentEntity) => document.rootBlock)
  rootBlockId: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity)
  createdBy: UserEntity;

  @RelationId((folder: FolderEntity) => folder.createdBy)
  createdById: string;

  @UpdateDateColumn()
  modifiedAt: Date;

  @ManyToOne(() => UserEntity)
  modifiedBy: UserEntity;

  @RelationId((folder: FolderEntity) => folder.modifiedBy)
  modifiedById: string;
}
