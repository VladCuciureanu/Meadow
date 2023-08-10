import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Team } from "../../teams/models/team";
import { Document } from "../../documents/models/document";
import { User as UserInterface } from "@meadow/shared";

@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  email: string;

  @Column("text")
  firstName: string;

  @Column("text")
  lastName: string;

  @Column("text", { nullable: true })
  imgUrl?: string;

  @ManyToMany(() => Team, (team) => team.members)
  teams: Team[];

  @OneToMany(() => Document, (document) => document.author)
  authoredDocuments: Document[];
}
