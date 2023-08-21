import { Router } from "express";

import blocksMiddleware from "./blocks.middleware";
import blocksController from "./blocks.controller";
import { validate } from "../common/common.middleware";
import {
  CreateBlockSchema,
  PatchBlockSchema,
  UpdateBlockSchema,
} from "@meadow/shared";

const BlockRoutes = Router();

BlockRoutes.route(`/`)
  .get(blocksController.getMany)
  .post(validate(CreateBlockSchema), blocksController.create);

BlockRoutes.route(`/:blockId`)
  .all(
    blocksMiddleware.validateBlockExists,
    blocksMiddleware.validateBlockAuthority
  )
  .get(blocksController.getById)
  .put(validate(UpdateBlockSchema), blocksController.put)
  .patch(validate(PatchBlockSchema), blocksController.patch)
  .delete(blocksController.delete);

export default BlockRoutes;
