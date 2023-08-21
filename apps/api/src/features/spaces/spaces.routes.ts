import { Router } from "express";

import spacesMiddleware from "./spaces.middleware";
import spacesController from "./spaces.controller";
import { validate } from "../common/common.middleware";
import {
  CreateSpaceSchema,
  PatchSpaceSchema,
  UpdateSpaceSchema,
} from "@meadow/shared";

const SpaceRoutes = Router();

SpaceRoutes.route(`/`)
  .get(spacesController.getMany)
  .post(validate(CreateSpaceSchema), spacesController.create);

SpaceRoutes.route(`/:spaceId`)
  .all(
    spacesMiddleware.validateSpaceExists,
    spacesMiddleware.validateSpaceAuthority
  )
  .get(spacesController.getById)
  .put(validate(UpdateSpaceSchema), spacesController.put)
  .patch(validate(PatchSpaceSchema), spacesController.patch)
  .delete(spacesController.delete);

export default SpaceRoutes;
