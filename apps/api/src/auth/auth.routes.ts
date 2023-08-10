import { CommonRoutesConfig } from "../common/common.routes";
import { validate } from "../common/common.middleware";
import { LogInUserSchema } from "@meadow/shared";
import authController from "./auth.controller";
import express from "express";

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/auth/token`)
      .get(validate(LogInUserSchema), authController.getToken);

    return this.app;
  }
}
