import { Request, Response } from "express";
import { exit } from "process";
import { logger } from "../../../config/logger";

const handleError = (err: any, req?: Request, res?: Response) => {
  logger.error(err);

  if (!err.isOperational) {
    exit();
  }

  res?.status(err.statusCode).send(err.message);
};

export default handleError;
