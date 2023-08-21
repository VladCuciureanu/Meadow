import { Router } from "express";

import usersMiddleware from "./users.middleware";
import usersController from "./users.controller";

import {
  CreateUserSchema,
  PatchUserSchema,
  UpdateUserSchema,
} from "@meadow/shared";

import { validate } from "../common/common.middleware";
import { authenticate } from "../auth/auth.middleware";

const UserRoutes = Router();

UserRoutes.route(`/`)
  .get(authenticate, usersController.getMany)
  .post(
    validate(CreateUserSchema),
    usersMiddleware.validateEmailIsUnique,
    usersController.create
  );

UserRoutes.route(`/:userId`)
  .all(authenticate, usersMiddleware.validateUserExists)
  .get(usersController.getById)
  .put(
    usersMiddleware.validateCurrentUser,
    validate(UpdateUserSchema),
    usersMiddleware.validateEmailIsUnique,
    usersController.put
  )
  .patch(
    usersMiddleware.validateCurrentUser,
    validate(PatchUserSchema),
    usersMiddleware.validateEmailIsUnique,
    usersController.patch
  )
  .delete(usersMiddleware.validateCurrentUser, usersController.delete);

export default UserRoutes;
