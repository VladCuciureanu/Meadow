import { TypeOf, boolean, nativeEnum, number, object, string } from "zod";

export enum Environments {
  Development = "development",
  Production = "production",
  Test = "test",
}

const EnvironmentVariablesSchema = object({
  NODE_ENV: nativeEnum(Environments).default(Environments.Development),
  SERVER_PORT: number().default(3333),
  JWT_SECRET: string().describe("JWT Secret required to sign tokens."),
  DB_HOST: string().describe("PostgreSQL DB hostname."),
  DB_PORT: number().default(5432).describe("PostgreSQL DB port."),
  DB_USER: string().describe("PostgreSQL DB username."),
  DB_PASS: string().describe("PostgreSQL DB password."),
  DB_NAME: string().default("meadow").describe("PostgreSQL DB name."),
  DB_SYNC: boolean()
    .default(true)
    .describe("Should TypeORM sync the DB schema?"),
  DB_LOGGING: boolean().default(false).describe("Should TypeORM output logs?"),
});

try {
  EnvironmentVariablesSchema.parse(process.env);
} catch (err) {
  throw new Error(`Config validation error: ${err}`);
}

const env = process.env as any as TypeOf<typeof EnvironmentVariablesSchema>;

const config = {
  environment: env.NODE_ENV,
  port: env.SERVER_PORT,
  jwt: {
    secret: env.JWT_SECRET,
  },
  db: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASS,
    name: env.DB_NAME,
    sync: env.DB_SYNC,
    logging: env.DB_LOGGING,
  },
};

export default config;
