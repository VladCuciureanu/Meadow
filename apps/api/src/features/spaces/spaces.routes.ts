import { Router } from "express";

import spacesController from "./spaces.controller";
import {
  CreateSpaceSchema,
  PatchSpaceSchema,
  UpdateSpaceSchema,
} from "@meadow/shared";
import { validate } from "../common/middlewares/validate";
import { validateSpaceAuthority } from "./middlewares/validate-space-authority";
import { validateSpaceExists } from "./middlewares/validate-space-exists";
import { authenticate } from "../auth/middlewares/authenticate";

const SpaceRoutes = Router();

SpaceRoutes.route(`/`)
  .all(authenticate)
  .get(spacesController.getMany)
  .post(validate(CreateSpaceSchema), spacesController.create);

SpaceRoutes.route(`/:spaceId`)
  .all(authenticate, validateSpaceExists, validateSpaceAuthority)
  .get(spacesController.getById)
  .put(validate(UpdateSpaceSchema), spacesController.put)
  .patch(validate(PatchSpaceSchema), spacesController.patch)
  .delete(spacesController.delete);

export default SpaceRoutes;
