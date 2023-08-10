import { CommonRoutesConfig } from "../common/common.routes";
import express from "express";

import BlocksMiddleware from "./blocks.middleware";
import BlocksController from "./blocks.controller";

export class BlocksRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "BlocksRoutes");
  }

  configureRoutes() {
    this.app.route(`/blocks`);
    // .get(BlocksController.listBlocks)
    // .post(BlocksController.createBlock);

    this.app.param(`blockId`, BlocksMiddleware.extractBlockId);
    this.app
      .route(`/blocks/:blockId`)
      .all(BlocksMiddleware.validateBlockExists)
      .get(BlocksController.getBlockById);
    // .delete(BlocksController.removeBlock)
    // .put(BlocksController.put)
    // .patch(BlocksController.patch);

    return this.app;
  }
}
