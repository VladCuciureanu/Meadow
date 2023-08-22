import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TeamEntity } from "../teams/team.entity";
import { DocumentEntity } from "../documents/document.entity";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { select: false, unique: true })
  email: string;

  @Column("text")
  firstName: string;

  @Column("text")
  lastName: string;

  @Column("text", { select: false })
  passwordHash: string;

  @Column("text", { nullable: true })
  imgUrl?: string;

  @ManyToMany(() => TeamEntity, (team) => team.members)
  teams: TeamEntity[];

  @OneToMany(() => DocumentEntity, (document) => document.author)
  authoredDocuments: DocumentEntity[];
}
