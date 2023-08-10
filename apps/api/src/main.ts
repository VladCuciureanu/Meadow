/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, { Application, json } from "express";
import * as expressWinston from "express-winston";
import * as winston from "winston";
import * as http from "http";
import compression from "compression";
import debug from "debug";
import cors from "cors";
import { MeadowDataSource } from "./data-source";
import { CommonRoutesConfig } from "./common/common.routes";
import { TeamsRoutes } from "./teams/teams.routes";
import { SpacesRoutes } from "./spaces/spaces.routes";
import { FoldersRoutes } from "./folders/folders.routes";
import { DocumentsRoutes } from "./documents/documents.routes";
import { BlocksRoutes } from "./blocks/blocks.routes";
import { UsersRoutes } from "./users/users.routes";

const app: Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 3333;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("api");

// Initialize DB
MeadowDataSource.initialize()
  .then(() => {
    debugLog("💽 Database has been initialized!");
  })
  .catch((err) => {
    debugLog("🚨 Error during database initialization: ", err);
  });

// Compress responses
app.use(json());
app.use(cors());
app.use(compression());

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

// Hook up routes
routes.push(new TeamsRoutes(app));
routes.push(new SpacesRoutes(app));
routes.push(new FoldersRoutes(app));
routes.push(new DocumentsRoutes(app));
routes.push(new BlocksRoutes(app));
routes.push(new UsersRoutes(app));

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

server.listen(port, () => {
  debugLog(`Server running at http://localhost:${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`🔧 Routes configured for ${route.getName()}`);
  });
});
