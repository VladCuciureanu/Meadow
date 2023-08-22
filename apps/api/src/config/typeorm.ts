import "reflect-metadata";
import { DataSource } from "typeorm";
import { BlockEntity } from "../features/blocks/block.entity";
import { UserEntity } from "../features/users/user.entity";
import { TeamEntity } from "../features/teams/team.entity";
import { SpaceEntity } from "../features/spaces/space.entity";
import { FolderEntity } from "../features/folders/folder.entity";
import { DocumentEntity } from "../features/documents/document.entity";
import config from "./env";

export const MeadowDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  synchronize: config.db.sync,
  logging: config.db.logging,
  entities: [
    UserEntity,
    TeamEntity,
    SpaceEntity,
    FolderEntity,
    DocumentEntity,
    BlockEntity,
  ],
  subscribers: [],
  migrations: [],
});

MeadowDataSource.initialize()
  .then(() => {
    console.info("💽 Database has been initialized!");
  })
  .catch((err) => {
    console.error("🚨 Error during database initialization: ", err);
  });
