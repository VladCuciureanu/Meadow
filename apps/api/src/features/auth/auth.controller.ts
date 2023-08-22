import express from "express";
import authService from "./auth.service";
import { LogInDto, LogInRequest } from "@meadow/shared";
import { logger } from "../../config/logger";

class AuthController {
  async getToken(req: express.Request, res: express.Response) {
    try {
      const dto = new LogInDto(req as LogInRequest);
      const token = await authService.getToken(dto);
      res.status(200).send(token);
    } catch (err) {
      logger.error(err);
      res.status(401).send("");
    }
  }
}

export default new AuthController();
