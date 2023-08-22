import { Router } from "express";

import blocksController from "./blocks.controller";
import {
  CreateBlockSchema,
  PatchBlockSchema,
  UpdateBlockSchema,
} from "@meadow/shared";
import { validate } from "../common/middlewares/validate";
import { validateBlockAuthority } from "./middlewares/validate-block-authority";
import { validateBlockExists } from "./middlewares/validate-block-exists";

const BlockRoutes = Router();

BlockRoutes.route(`/`)
  .get(blocksController.getMany)
  .post(validate(CreateBlockSchema), blocksController.create);

BlockRoutes.route(`/:blockId`)
  .all(validateBlockExists, validateBlockAuthority)
  .get(blocksController.getById)
  .put(validate(UpdateBlockSchema), blocksController.put)
  .patch(validate(PatchBlockSchema), blocksController.patch)
  .delete(blocksController.delete);

export default BlockRoutes;
