import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm";
import { Space } from "../spaces/space.model";
import { User } from "../users/user.model";

@Entity()
export class Team {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  imgUrl?: string;

  @ManyToMany(() => User, (user) => user.teams, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  members: User[];

  @OneToMany(() => Space, (space) => space.team)
  spaces: Space[];
}
