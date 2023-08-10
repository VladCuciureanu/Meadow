import express from "express";
import UsersService from "./users.service";
import { MeadowError } from "../common/common.middleware";

class UsersMiddleware {
  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await UsersService.getById(req.params.userId);
    if (user) {
      next();
    } else {
      res.status(404).send({ error: `User ${req.params.userId} not found` });
    }
  }

  async validateEmailIsUnique(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await UsersService.getByEmail(req.body.email);
    if (!user) {
      next();
    } else {
      res.status(500).send({
        status: "Failed payload validations.",
        errors: ["Email must be unique."],
      } as MeadowError);
    }
  }

  async extractUserId(
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.userId;
    next();
  }
}

export default new UsersMiddleware();
