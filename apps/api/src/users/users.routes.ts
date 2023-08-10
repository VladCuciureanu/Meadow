import { CommonRoutesConfig } from "../common/common.routes";
import express from "express";

import UsersMiddleware from "./users.middleware";
import UsersController from "./users.controller";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes() {
    this.app.route(`/users`);
    // .get(UsersController.listUsers)
    // .post(UsersController.createUser);

    this.app.param(`userId`, UsersMiddleware.extractUserId);
    this.app
      .route(`/users/:userId`)
      .all(UsersMiddleware.validateUserExists)
      .get(UsersController.getUserById);
    // .delete(UsersController.removeUser)
    // .put(UsersController.put)
    // .patch(UsersController.patch);

    return this.app;
  }
}
