import { validate } from "../common/common.middleware";
import { LogInUserSchema } from "@meadow/shared";
import authController from "./auth.controller";
import { Router } from "express";

const AuthRoutes = Router();

AuthRoutes.route(`/auth/token`).get(
  validate(LogInUserSchema),
  authController.getToken
);

export default AuthRoutes;
