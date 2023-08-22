import pino from "pino-http";

export const pinoLogger = pino({
  autoLogging: false,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export const logger = pinoLogger.logger;
