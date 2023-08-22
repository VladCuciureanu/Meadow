import { LogInSchema } from "@meadow/shared";
import { validate } from "../common/common.middleware";
import { Router } from "express";
import authController from "./auth.controller";

const AuthRoutes = Router();

AuthRoutes.route(`/token`).get(validate(LogInSchema), authController.getToken);

export default AuthRoutes;
