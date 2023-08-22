import {
  CreateUserSchema,
  PatchUserSchema,
  UpdateUserSchema,
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
  .get(authenticate, usersController.getMany)
  .post(
    validate(CreateUserSchema),
    validateEmailIsUnique,
    usersController.create
  );

UserRoutes.route(`/:userId`)
  .all(authenticate, validateUserExists)
  .get(usersController.getById)
  .put(
    validateCurrentUser,
    validate(UpdateUserSchema),
    validateEmailIsUnique,
    usersController.put
  )
  .patch(
    validateCurrentUser,
    validate(PatchUserSchema),
    validateEmailIsUnique,
    usersController.patch
  )
  .delete(validateCurrentUser, usersController.delete);

export default UserRoutes;
