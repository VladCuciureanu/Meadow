import express from "express";
import authService from "./auth.service";
import debug from "debug";
import { LogInUserSchema } from "@meadow/shared";
import { TypeOf } from "zod";

const log: debug.IDebugger = debug("api:auth:controller");

class AuthController {
  async getToken(req: express.Request, res: express.Response) {
    try {
      const token = await authService.getToken(
        req as any as TypeOf<typeof LogInUserSchema>
      );
      res.status(200).send(token);
    } catch (err) {
      res.status(401);
    }
  }
}

export default new AuthController();
