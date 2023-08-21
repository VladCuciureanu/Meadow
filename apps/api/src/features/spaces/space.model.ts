import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { Document } from "../documents/document.model";
import { Folder } from "../folders/folder.model";
import { Block } from "../blocks/block.model";
import { Team } from "../teams/team.model";
import { Space as SpaceInterface } from "@meadow/shared";

@Entity()
export class Space implements SpaceInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  imgUrl?: string;

  @OneToMany(() => Block, (block) => block.space)
  blocks: Block[];

  @OneToMany(() => Document, (document) => document.space)
  documents: Document[];

  @OneToMany(() => Folder, (folder) => folder.space)
  folders: Folder[];

  @Column("text", { array: true })
  rootFolderOrder: string[];

  @ManyToOne(() => Team, (team) => team.spaces, {
    onDelete: "CASCADE",
  })
  team: Team;

  @RelationId((space: Space) => space.team)
  teamId: string;
}
