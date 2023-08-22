import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Team } from "../teams/team.model";
import { Document } from "../documents/document.model";

@Entity()
export class User {
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

  @ManyToMany(() => Team, (team) => team.members)
  teams: Team[];

  @OneToMany(() => Document, (document) => document.author)
  authoredDocuments: Document[];
}
