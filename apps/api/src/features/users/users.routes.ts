import {
  CreateUserRequestSchema,
  DeleteUserRequestSchema,
  GetUserRequestSchema,
  GetUsersRequestSchema,
  UpdateUserRequestSchema,
} from "@meadow/shared";
import { Router } from "express";
import usersController from "./users.controller";
import { authenticate } from "../auth/middlewares/authenticate";
import { validate } from "../common/middlewares/validate";
import { validateCurrentUser } from "./middlewares/validate-current-user";
import { validateEmailIsUnique } from "./middlewares/validate-unique-email";
import { validateUserExists } from "./middlewares/validate-user-exists";

const UserRoutes = Router();

UserRoutes.route(`/`)
  .get(authenticate, validate(GetUsersRequestSchema), usersController.getMany)
  .post(
    validate(CreateUserRequestSchema),
    validateEmailIsUnique,
    usersController.create
  );

UserRoutes.route(`/:userId`)
  .all(authenticate, validateUserExists)
  .get(validate(GetUserRequestSchema), usersController.getById)
  .patch(
    validateCurrentUser,
    validate(UpdateUserRequestSchema),
    validateEmailIsUnique,
    usersController.patch
  )
  .delete(
    validateCurrentUser,
    validate(DeleteUserRequestSchema),
    usersController.delete
  );

export default UserRoutes;
