import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm";
import { Space } from "../spaces/space.model";
import { Team as TeamInterface } from "@meadow/shared";
import { User } from "../users/user.model";

@Entity()
export class Team implements TeamInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  imgUrl?: string;

  @ManyToMany(() => User, (user) => user.teams)
  @JoinTable()
  members: User[];

  @OneToMany(() => Space, (space) => space.team)
  spaces: Space[];
}
