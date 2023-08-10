import "reflect-metadata";
import {
  Block,
  DividerBlock,
  CodeBlock,
  TextBlock,
  ImageBlock,
  VideoBlock,
  FileBlock,
  UrlBlock,
} from "./models/block";
import { User } from "./models/user";
import { Team } from "./teams/models/team";
import { Space } from "./spaces/models/space";
import { Folder } from "./models/folder";
import { Document } from "./models/document";
import { DataSource } from "typeorm";

export const MeadowDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "meadow",
  synchronize: true,
  logging: false,
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
