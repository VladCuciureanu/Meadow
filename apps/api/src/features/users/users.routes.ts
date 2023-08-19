import { Router } from "express";

import UsersMiddleware from "./users.middleware";
import UsersController from "./users.controller";

import {
  CreateUserSchema,
  PatchUserSchema,
  UpdateUserSchema,
} from "@meadow/shared";

import { validate } from "../common/common.middleware";
import { authenticate } from "../auth/auth.middleware";

const UserRoutes = Router();

UserRoutes.route(`/`)
  .get(UsersController.getMany)
  .post(
    validate(CreateUserSchema),
    UsersMiddleware.validateEmailIsUnique,
    UsersController.create
  );

UserRoutes.route(`/:userId`)
  .all(UsersMiddleware.validateUserExists)
  .get(UsersController.getById)
  .put(
    validate(UpdateUserSchema),
    authenticate,
    UsersMiddleware.validateCurrentUser,
    UsersMiddleware.validateEmailIsUnique,
    UsersController.put
  )
  .patch(
    validate(PatchUserSchema),
    authenticate,
    UsersMiddleware.validateCurrentUser,
    UsersMiddleware.validateEmailIsUnique,
    UsersController.patch
  )
  .delete(
    authenticate,
    UsersMiddleware.validateCurrentUser,
    UsersController.delete
  );

export default UserRoutes;
