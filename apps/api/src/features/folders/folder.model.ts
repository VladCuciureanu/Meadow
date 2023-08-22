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
import { Document } from "../documents/document.model";
import { Space } from "../spaces/space.model";
import { FolderIconConfig, Folder as FolderInterface } from "@meadow/shared";

@Entity()
export class Folder {
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

  @OneToMany(() => Document, (document) => document.folder)
  documents: Document[];

  @ManyToOne(() => Folder, (folder) => folder.childrenFolders, {
    onDelete: "CASCADE",
  })
  parentFolder?: Folder;

  @RelationId((folder: Folder) => folder.parentFolder)
  parentFolderId?: string;

  @OneToMany(() => Folder, (folder) => folder.parentFolder)
  childrenFolders: Folder[];

  @ManyToOne(() => Space, (space) => space.folders, {
    onDelete: "CASCADE",
  })
  space: Space;

  @RelationId((folder: Folder) => folder.space)
  spaceId: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
