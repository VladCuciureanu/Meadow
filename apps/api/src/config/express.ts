import express, {
  Application,
  NextFunction,
  Request,
  Response,
  json,
} from "express";
import config, { Environments } from "./env";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ZodError } from "zod";
import createHttpError from "http-errors";
import routes from "./routes";
import swaggerRoutes from "./swagger";
import passport from "passport";
import helmet from "helmet";

// Create express server
const app: Application = express();

// Enable morgan logger for development
if (config.environment === Environments.Development) {
  app.use(morgan("dev"));
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

// 404 handler
app.use((req, res, next) => {
  const err = createHttpError(404);
  return next(err);
});

// Error handler, send stacktrace only during development
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Customize Zod validation errors
  if (err instanceof ZodError) {
    err = err.issues.map((e) => ({ message: e.message, path: e.path }));

    return res.status(400).json({
      status: "Failed payload validations.",
      errors: err,
    });
  }

  res.status(err.status || 500).json({
    message: err.message,
  });

  next(err);
});

export default app;
