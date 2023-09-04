import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { DocumentEntity } from "../documents/documents.entity";
import { FolderEntity } from "../folders/folders.entity";
import { TeamEntity } from "../teams/teams.entity";

@Entity()
export class SpaceEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  imgUrl?: string;

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
