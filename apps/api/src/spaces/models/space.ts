import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { Document } from "../../models/document";
import { Folder } from "../../models/folder";
import { Block } from "../../models/block";
import { Team } from "../../teams/models/team";
import { Space as SpaceInterface } from "@meadow/shared";

@Entity()
export class Space implements SpaceInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  imgUrl: string | null;

  @OneToMany(() => Block, (block) => block.space)
  blocks: Block[];

  @OneToMany(() => Document, (document) => document.space)
  documents: Document[];

  @OneToMany(() => Folder, (folder) => folder.space)
  folders: Folder[];

  @Column("text", { array: true })
  rootFolderOrder: string[];

  @ManyToOne(() => Team, (team) => team.spaces)
  team: Team;

  @RelationId((space: Space) => space.team)
  teamId: string;
}
