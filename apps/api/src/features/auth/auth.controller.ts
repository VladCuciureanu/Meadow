import express from "express";
import authService from "./auth.service";

class AuthController {
  async getToken(req: express.Request, res: express.Response) {
    try {
      const token = await authService.getToken(req);
      res.status(200).send(token);
    } catch (err) {
      res.status(401).send("");
    }
  }
}

export default new AuthController();
