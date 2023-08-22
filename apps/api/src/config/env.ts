import { boolean, nativeEnum, object, string } from "zod";
import MeadowError from "../features/common/interfaces/error";

export enum Environments {
  Development = "development",
  Production = "production",
  Test = "test",
}

const EnvironmentVariablesSchema = object({
  NODE_ENV: nativeEnum(Environments).default(Environments.Development),
  SERVER_PORT: string().default("3333"),
  JWT_SECRET: string().describe("JWT Secret required to sign tokens."),
  DB_HOST: string().describe("PostgreSQL DB hostname."),
  DB_PORT: string()
    .regex(/\d+/g)
    .default("5432")
    .describe("PostgreSQL DB port."),
  DB_USER: string().describe("PostgreSQL DB username."),
  DB_PASS: string().describe("PostgreSQL DB password."),
  DB_NAME: string().default("meadow").describe("PostgreSQL DB name."),
  DB_SYNC: boolean()
    .default(true)
    .describe("Should TypeORM sync the DB schema?"),
  DB_LOGGING: boolean().default(false).describe("Should TypeORM output logs?"),
});

let env;
try {
  env = EnvironmentVariablesSchema.parse(process.env);
} catch (err) {
  throw new MeadowError(500, `Config validation error: ${err}`);
}

const config = {
  environment: env.NODE_ENV,
  port: parseInt(env.SERVER_PORT),
  jwt: {
    secret: env.JWT_SECRET,
  },
  db: {
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    username: env.DB_USER,
    password: env.DB_PASS,
    name: env.DB_NAME,
    sync: env.DB_SYNC,
    logging: env.DB_LOGGING,
  },
};

export default config;
