import { validate } from "../common/common.middleware";
import { UserCredentialsSchema } from "@meadow/shared";
import authController from "./auth.controller";
import { Router } from "express";

const AuthRoutes = Router();

AuthRoutes.route(`/token`).get(
  validate(UserCredentialsSchema),
  authController.getToken
);

export default AuthRoutes;
