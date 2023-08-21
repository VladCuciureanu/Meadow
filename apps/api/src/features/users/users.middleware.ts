import express from "express";
import usersService from "./users.service";
import { MeadowError } from "../common/common.middleware";
import { AuthenticatedRequest } from "../auth/auth.interfaces";

class UsersMiddleware {
  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await usersService.getById(req.params.userId);
    if (user) {
      next();
    } else {
      res.status(404).send({ error: `User ${req.params.userId} not found` });
    }
  }

  validateCurrentUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if ((req as AuthenticatedRequest)?.user?.id === req.params.userId) {
      next();
    } else {
      res
        .status(403)
        .send({ error: `You are not authorized to do requested action.` });
    }
  }

  async validateEmailIsUnique(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const bodyContainsEmail = Object.keys(req.body).includes("email");

    if (!bodyContainsEmail) {
      next();
    }

    const user = await usersService.getByEmail(req.body.email);

    if (!user) {
      next();
    } else {
      res.status(500).send({
        status: "Failed payload validations.",
        errors: ["Email must be unique."],
      } as MeadowError);
    }
  }
}

export default new UsersMiddleware();
