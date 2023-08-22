import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { DocumentEntity } from "../documents/document.entity";
import { FolderEntity } from "../folders/folder.entity";
import { BlockEntity } from "../blocks/block.entity";
import { TeamEntity } from "../teams/team.entity";

@Entity()
export class SpaceEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  imgUrl?: string;

  @OneToMany(() => BlockEntity, (block) => block.space)
  blocks: BlockEntity[];

  @OneToMany(() => DocumentEntity, (document) => document.space)
  documents: DocumentEntity[];

  @OneToMany(() => FolderEntity, (folder) => folder.space)
  folders: FolderEntity[];

  @Column("text", { array: true })
  rootFolderOrder: string[];

  @ManyToOne(() => TeamEntity, (team) => team.spaces, {
    onDelete: "CASCADE",
  })
  team: TeamEntity;

  @RelationId((space: SpaceEntity) => space.team)
  teamId: string;
}
