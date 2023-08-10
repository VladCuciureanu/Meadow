import { CommonRoutesConfig } from "../common/common.routes";
import express from "express";

import UsersMiddleware from "./users.middleware";
import UsersController from "./users.controller";
import {
  CreateUserSchema,
  PatchUserSchema,
  UpdateUserSchema,
} from "@meadow/shared";
import { validate } from "../common/common.middleware";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/users`)
      .get(UsersController.get)
      .post(
        validate(CreateUserSchema),
        UsersMiddleware.validateEmailIsUnique,
        UsersController.createUser
      );

    this.app.param(`userId`, UsersMiddleware.extractUserId);
    this.app
      .route(`/users/:userId`)
      .all(UsersMiddleware.validateUserExists)
      .get(UsersController.getById)
      // .delete(UsersController.removeUser)
      .put(
        validate(UpdateUserSchema),
        UsersMiddleware.validateEmailIsUnique,
        UsersController.put
      )
      .patch(
        validate(PatchUserSchema),
        UsersMiddleware.validateEmailIsUnique,
        UsersController.patch
      );

    return this.app;
  }
}
