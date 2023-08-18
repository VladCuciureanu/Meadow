import { Router } from "express";

import UsersMiddleware from "./users.middleware";
import UsersController from "./users.controller";

import {
  CreateUserSchema,
  PatchUserSchema,
  UpdateUserSchema,
} from "@meadow/shared";

import { validate } from "../common/common.middleware";

const UserRoutes = Router();

UserRoutes.route(`/users`)
  .get(UsersController.get)
  .post(
    validate(CreateUserSchema),
    UsersMiddleware.validateEmailIsUnique,
    UsersController.createUser
  );

UserRoutes.param(`userId`, UsersMiddleware.extractUserId);
UserRoutes.route(`/users/:userId`)
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

export default UserRoutes;
