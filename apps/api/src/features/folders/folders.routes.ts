import { Router } from "express";

import foldersMiddleware from "./folders.middleware";
import foldersController from "./folders.controller";
import { validate } from "../common/common.middleware";
import {
  CreateFolderSchema,
  PatchFolderSchema,
  UpdateFolderSchema,
} from "@meadow/shared";

const FolderRoutes = Router();

FolderRoutes.route(`/`)
  .get(foldersController.getMany)
  .post(validate(CreateFolderSchema), foldersController.create);

FolderRoutes.route(`/:folderId`)
  .all(
    foldersMiddleware.validateFolderExists,
    foldersMiddleware.validateFolderAuthority
  )
  .get(foldersController.getById)
  .put(validate(UpdateFolderSchema), foldersController.put)
  .patch(validate(PatchFolderSchema), foldersController.patch)
  .delete(foldersController.delete);

export default FolderRoutes;
