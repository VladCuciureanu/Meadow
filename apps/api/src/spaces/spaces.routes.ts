import { CommonRoutesConfig } from "../common/common.routes";
import express from "express";

import SpacesMiddleware from "./spaces.middleware";
import SpacesController from "./spaces.controller";

export class SpacesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "SpacesRoutes");
  }

  configureRoutes() {
    this.app.route(`/spaces`);
    // .get(SpacesController.listSpaces)
    // .post(SpacesController.createSpace);

    this.app.param(`spaceId`, SpacesMiddleware.extractSpaceId);
    this.app
      .route(`/spaces/:spaceId`)
      .all(SpacesMiddleware.validateSpaceExists)
      .get(SpacesController.getSpaceById);
    // .delete(SpacesController.removeSpace)
    // .put(SpacesController.put)
    // .patch(SpacesController.patch);

    return this.app;
  }
}
