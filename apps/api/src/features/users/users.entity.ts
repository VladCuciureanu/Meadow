import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TeamEntity } from "../teams/teams.entity";
import { DocumentEntity } from "../documents/documents.entity";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  email: string;

  @Column("text")
  firstName: string;

  @Column("text")
  lastName: string;

  @Column("text")
  passwordHash: string;

  @Column("text", { nullable: true })
  imgUrl?: string;

  @ManyToMany(() => TeamEntity, (team) => team.members)
  teams: TeamEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
