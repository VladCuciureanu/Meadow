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
import { Document } from "../../documents/models/document";
import { Space } from "../../spaces/models/space";
import { FolderIconConfig, Folder as FolderInterface } from "@meadow/shared";

@Entity()
export class Folder implements FolderInterface {
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

  @ManyToOne(() => Folder, (folder) => folder.childrenFolders)
  parentFolder?: Folder;

  @RelationId((folder: Folder) => folder.parentFolder)
  parentFolderId?: string;

  @OneToMany(() => Folder, (folder) => folder.parentFolder)
  childrenFolders: Folder[];

  @ManyToOne(() => Space, (space) => space.folders)
  space: Space;

  @RelationId((folder: Folder) => folder.space)
  spaceId: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
