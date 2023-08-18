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
} from "../features/blocks/block.model";
import { User } from "../features/users/user.model";
import { Team } from "../features/teams/team.model";
import { Space } from "../features/spaces/space.model";
import { Folder } from "../features/folders/folder.model";
import { Document } from "../features/documents/document.model";
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
