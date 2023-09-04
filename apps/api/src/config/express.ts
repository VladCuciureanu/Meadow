import express, {
  Application,
  NextFunction,
  Request,
  Response,
  json,
} from "express";
import config, { Environments } from "./env";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import createHttpError from "http-errors";
import routes from "./routes";
import swaggerRoutes from "./swagger";
import passport from "passport";
import helmet from "helmet";
import handleError from "../features/common/middlewares/handle-error";
import { pinoLogger } from "./logger";

// Create express server
const app: Application = express();

// Enable morgan logger for development
if (config.environment === Environments.Development) {
  app.use(pinoLogger);
  app.use("/api-docs", swaggerRoutes);
}

// Secure API via Helmet
app.use(helmet());

// Payload handling
app.use(json());

// Enable gzip compression for faster data streaming (built-in in most modern browsers)
app.use(compression());

// Enable cookie parsing
app.use(cookieParser());

// Enable CORS
app.use(cors());

// Enable auth
app.use(passport.initialize());

// Base router
app.use("/api/v1/", routes);

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    handleError(err, req, res);
    next();
  } else {
    res.sendStatus(404);
    return next();
  }
});

process.on("uncaughtException", (error) => {
  handleError(error);
});

export default app;
