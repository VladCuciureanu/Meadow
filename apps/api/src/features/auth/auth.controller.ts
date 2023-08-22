import express from "express";
import authService from "./auth.service";
import { LogInDto, LogInRequest } from "@meadow/shared";

class AuthController {
  async getToken(req: express.Request, res: express.Response) {
    try {
      const dto = new LogInDto(req as LogInRequest);
      const token = await authService.getToken(dto);
      res.status(200).send(token);
    } catch (err) {
      res.status(401).send("");
    }
  }
}

export default new AuthController();
