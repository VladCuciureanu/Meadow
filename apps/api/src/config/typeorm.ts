import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  Block,
  DividerBlock,
  CodeBlock,
  TextBlock,
  ImageBlock,
  VideoBlock,
  FileBlock,
  UrlBlock,
} from "../features/blocks/models/block";
import { User } from "../features/users/models/user";
import { Team } from "../features/teams/models/team";
import { Space } from "../features/spaces/models/space";
import { Folder } from "../features/folders/models/folder";
import { Document } from "../features/documents/models/document";
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
    User,
    Team,
    Space,
    Folder,
    Document,
    Block,
    DividerBlock,
    CodeBlock,
    TextBlock,
    ImageBlock,
    VideoBlock,
    FileBlock,
    UrlBlock,
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
