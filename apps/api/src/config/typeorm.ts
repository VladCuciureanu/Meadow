import "reflect-metadata";
import { DataSource } from "typeorm";
import { BlockEntity, TextRunEntity } from "../features/blocks/blocks.entity";
import { UserEntity } from "../features/users/users.entity";
import { TeamEntity } from "../features/teams/teams.entity";
import { SpaceEntity } from "../features/spaces/spaces.entity";
import { FolderEntity } from "../features/folders/folders.entity";
import { DocumentEntity } from "../features/documents/documents.entity";
import config from "./env";

const databaseName =
  config.environment !== "test" ? config.db.name : `${config.db.name}-test`;
const shouldDropSchema = config.db.dropSchema || config.environment === "test";

export const MeadowDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: databaseName,
  synchronize: config.db.sync,
  logging: config.db.logging,
  dropSchema: shouldDropSchema,
  entities: [
    UserEntity,
    TeamEntity,
    SpaceEntity,
    FolderEntity,
    DocumentEntity,
    BlockEntity,
    TextRunEntity,
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
