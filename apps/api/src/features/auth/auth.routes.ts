import { Router } from "express";
import authController from "./auth.controller";
import { validate } from "../common/middlewares/validate";
import { GetTokenRequestSchema } from "@meadow/shared";

const AuthRoutes = Router();

AuthRoutes.route(`/token`).get(
  validate(GetTokenRequestSchema),
  authController.getToken
);

export default AuthRoutes;
