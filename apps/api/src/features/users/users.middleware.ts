import express from "express";
import UsersService from "./users.service";
import { MeadowError } from "../common/common.middleware";
import { AuthenticatedRequest } from "../auth/auth.interfaces";

class UsersMiddleware {
  validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    UsersService.getById(req.params.userId).then((user) => {
      if (user) {
        next();
      } else {
        res.status(404).send({ error: `User ${req.params.userId} not found` });
      }
    });
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

  validateEmailIsUnique(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body.email) {
      UsersService.getByEmail(req.body.email).then((user) => {
        if (!user) {
          next();
        } else {
          res.status(500).send({
            status: "Failed payload validations.",
            errors: ["Email must be unique."],
          } as MeadowError);
        }
      });
    } else {
      next();
    }
  }
}

export default new UsersMiddleware();
