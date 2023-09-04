import express from "express";
import authService from "./auth.service";
import { GetTokenRequest } from "@meadow/shared";
import { logger } from "../../config/logger";

class AuthController {
  async getToken(req: express.Request, res: express.Response) {
    try {
      const dto: GetTokenRequest = {
        email: req.body.email,
        password: req.body.password,
      };
      const response = await authService.getToken(dto);
      res.status(200).send(response);
    } catch (err) {
      logger.error(err);
      res.status(401).send("");
    }
  }
}

export default new AuthController();
