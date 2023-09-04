import express from "express";
import authService from "./auth.service";
import { GetTokenRequestSchema } from "@meadow/shared";

class AuthController {
  async getToken(req: express.Request, res: express.Response) {
    const schema = GetTokenRequestSchema.parse(req);

    const response = await authService.getToken({
      email: schema.body.email,
      password: schema.body.password,
    });

    if (!response) {
      return res.status(401);
    }

    return res.status(200).send(response);
  }
}

export default new AuthController();
