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

const SpaceRoutes = Router();

SpaceRoutes.route(`/`)
  .get(spacesController.getMany)
  .post(validate(CreateSpaceSchema), spacesController.create);

SpaceRoutes.route(`/:spaceId`)
  .all(validateSpaceExists, validateSpaceAuthority)
  .get(spacesController.getById)
  .put(validate(UpdateSpaceSchema), spacesController.put)
  .patch(validate(PatchSpaceSchema), spacesController.patch)
  .delete(spacesController.delete);

export default SpaceRoutes;
