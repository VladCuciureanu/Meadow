import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm";
import { SpaceEntity } from "../spaces/spaces.entity";
import { UserEntity } from "../users/users.entity";

@Entity()
export class TeamEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  imgUrl?: string;

  @ManyToMany(() => UserEntity, (user) => user.teams, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  members: UserEntity[];

  @OneToMany(() => SpaceEntity, (space) => space.team)
  spaces: SpaceEntity[];
}
