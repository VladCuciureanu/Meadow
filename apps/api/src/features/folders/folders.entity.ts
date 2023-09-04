import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from "typeorm";
import { DocumentEntity } from "../documents/documents.entity";
import { SpaceEntity } from "../spaces/spaces.entity";
import { FolderIconConfig } from "@meadow/shared";
import { UserEntity } from "../users/users.entity";

@Entity()
export class FolderEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  description?: string;

  @Column("jsonb")
  icon: FolderIconConfig;

  @Column("text", { array: true })
  itemOrder: string[];

  @OneToMany(() => DocumentEntity, (document) => document.folder)
  documents: DocumentEntity[];

  @ManyToOne(() => FolderEntity, (folder) => folder.childrenFolders, {
    onDelete: "CASCADE",
  })
  parentFolder?: FolderEntity;

  @RelationId((folder: FolderEntity) => folder.parentFolder)
  parentFolderId?: string;

  @OneToMany(() => FolderEntity, (folder) => folder.parentFolder)
  childrenFolders: FolderEntity[];

  @ManyToOne(() => SpaceEntity, (space) => space.folders, {
    onDelete: "CASCADE",
  })
  space: SpaceEntity;

  @RelationId((folder: FolderEntity) => folder.space)
  spaceId: string;

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
