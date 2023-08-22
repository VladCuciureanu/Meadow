import { LogInSchema } from "@meadow/shared";
import { Router } from "express";
import authController from "./auth.controller";
import { validate } from "../common/middlewares/validate";

const AuthRoutes = Router();

AuthRoutes.route(`/token`).get(validate(LogInSchema), authController.getToken);

export default AuthRoutes;
