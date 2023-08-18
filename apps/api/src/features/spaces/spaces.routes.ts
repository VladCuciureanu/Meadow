import { Router } from "express";

import SpacesMiddleware from "./spaces.middleware";
import SpacesController from "./spaces.controller";

const SpaceRoutes = Router();

SpaceRoutes.route(`/spaces`);
// .get(SpacesController.listSpaces)
// .post(SpacesController.createSpace);

SpaceRoutes.param(`spaceId`, SpacesMiddleware.extractSpaceId);
SpaceRoutes.route(`/spaces/:spaceId`)
  .all(SpacesMiddleware.validateSpaceExists)
  .get(SpacesController.getSpaceById);
// .delete(SpacesController.removeSpace)
// .put(SpacesController.put)
// .patch(SpacesController.patch);

export default SpaceRoutes;
