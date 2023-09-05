import { Router } from "express";

import blocksController from "./blocks.controller";
import {
  CreateBlockRequestSchema,
  DeleteBlockRequestSchema,
  GetBlockRequestSchema,
  GetBlocksRequestSchema,
  UpdateBlockRequestSchema,
} from "@meadow/shared";
import { validate } from "../common/middlewares/validate";
import { validateBlockAuthority } from "./middlewares/validate-block-authority";
import { validateBlockExists } from "./middlewares/validate-block-exists";
import { authenticate } from "../auth/middlewares/authenticate";
import { validateBlockParentAuthority } from "./middlewares/validate-block-parent-authority";

const BlockRoutes = Router();

BlockRoutes.route(`/`)
  .all(authenticate)
  .get(validate(GetBlocksRequestSchema), blocksController.getMany)
  .post(
    validate(CreateBlockRequestSchema),
    validateBlockParentAuthority,
    blocksController.create
  );

BlockRoutes.route(`/:blockId`)
  .all(authenticate, validateBlockExists, validateBlockAuthority)
  .get(validate(GetBlockRequestSchema), blocksController.getById)
  .patch(
    validate(UpdateBlockRequestSchema),
    validateBlockParentAuthority,
    blocksController.patch
  )
  .delete(validate(DeleteBlockRequestSchema), blocksController.delete);

export default BlockRoutes;
