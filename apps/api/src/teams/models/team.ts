import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Space } from "../../spaces/models/space";
import { Team as TeamInterface } from "@meadow/shared";
import { User } from "../../users/models/user";

@Entity()
export class Team implements TeamInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  imgUrl: string | null;

  @ManyToMany(() => User, (user) => user.teams)
  members: User[];

  @OneToMany(() => Space, (space) => space.team)
  spaces: Space[];
}
