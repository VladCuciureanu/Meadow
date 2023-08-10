import express from "express";
import debug from "debug";
import UsersService from "./users.service";

const log: debug.IDebugger = debug("api:users:middlewares");

class UsersMiddleware {
  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await UsersService.readById(req.params.userId);
    if (user) {
      next();
    } else {
      res.status(404).send({ error: `User ${req.params.userId} not found` });
    }
  }

  async extractUserId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.userId;
    next();
  }
}

export default new UsersMiddleware();
