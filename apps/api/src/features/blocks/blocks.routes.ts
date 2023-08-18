import { Router } from "express";

import BlocksMiddleware from "./blocks.middleware";
import BlocksController from "./blocks.controller";

const BlockRoutes = Router();

BlockRoutes.route(`/blocks`);
// .get(BlocksController.listBlocks)
// .post(BlocksController.createBlock);

BlockRoutes.param(`blockId`, BlocksMiddleware.extractBlockId);
BlockRoutes.route(`/blocks/:blockId`)
  .all(BlocksMiddleware.validateBlockExists)
  .get(BlocksController.getBlockById);
// .delete(BlocksController.removeBlock)
// .put(BlocksController.put)
// .patch(BlocksController.patch);

export default BlockRoutes;
